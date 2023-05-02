import argparse
import os

import bcrypt
import psycopg2

parser = argparse.ArgumentParser(description='Super Admin')
parser.add_argument('--username', '-U', help='super admin username')
parser.add_argument('--password', '-P', help='super admin password')
args = parser.parse_args()

def hash_pw(password: str):
    salt = bcrypt.gensalt(12)
    encoded_pw = f'{password}'.encode('utf-8')
    hashed_pw = bcrypt.hashpw(encoded_pw, salt)
    return hashed_pw, salt

def main(username, password):
    hashed_password, salt = hash_pw(password)
    hashed_password = hashed_password.decode('utf-8')
    salt = salt.decode('utf-8')

    if os.environ.get("IN_DOCKER"):
        host = "postgre_db"
    else:
        host = "localhost"

    con = psycopg2.connect(
        host=host,
        database="database",
        user='postgres',
        password="root")
    cur = con.cursor()
    cur.execute("INSERT INTO web_user(USERNAME, PASSWORD, SALT, ROLE) VALUES(%s, %s, %s, %s)", (username, hashed_password, salt, 'admin'))
    
    con.commit()
    con.close()

if __name__ == '__main__':
    main(args.username, args.password)