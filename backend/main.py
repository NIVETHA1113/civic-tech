from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from db import get_connection

app = FastAPI()

# allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# TEST DATABASE CONNECTION
# -----------------------------
@app.get("/test-db")
def test_db():

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT 1")
        result = cursor.fetchone()

        conn.close()

        return {
            "message": "Database connected successfully",
            "result": result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------
# REGISTER USER
# -----------------------------
@app.post("/register")
def register(user: dict):

    try:
        conn = get_connection()
        cursor = conn.cursor()

        # check if email exists
        cursor.execute(
            "SELECT * FROM users WHERE email=%s",
            (user["email"],)
        )

        existing = cursor.fetchone()

        if existing:
            conn.close()
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )

        cursor.execute(
            """
            INSERT INTO users (name,email,password,role)
            VALUES (%s,%s,%s,%s)
            """,
            (
                user["name"],
                user["email"],
                user["password"],
                user["role"]
            )
        )

        conn.commit()
        conn.close()

        return {
            "message": "User registered successfully"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------
# LOGIN USER
# -----------------------------
@app.post("/login")
def login(user: dict):

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT id,name,email,role
            FROM users
            WHERE email=%s AND password=%s
            """,
            (
                user["email"],
                user["password"]
            )
        )

        result = cursor.fetchone()

        conn.close()

        if result:
            return {
                "message": "Login successful",
                "user": result
            }
        else:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------
# SUBMIT COMPLAINT
# -----------------------------
@app.post("/complaints")
def create_complaint(data: dict):

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO complaints
            (title,description,category,user_id)
            VALUES (%s,%s,%s,%s)
            """,
            (
                data["title"],
                data["description"],
                data["category"],
                data["user_id"]
            )
        )

        conn.commit()
        conn.close()

        return {
            "message": "Complaint submitted successfully"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------
# CITIZEN VIEW OWN COMPLAINTS
# -----------------------------
@app.get("/complaints/user/{user_id}")
def get_user_complaints(user_id: int):

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT id,title,description,category,status,created_at
            FROM complaints
            WHERE user_id=%s
            ORDER BY created_at DESC
            """,
            (user_id,)
        )

        result = cursor.fetchall()

        conn.close()

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------
# ADMIN VIEW ALL COMPLAINTS
# -----------------------------
@app.get("/complaints")
def get_all_complaints():

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT complaints.id,
                   complaints.title,
                   complaints.description,
                   complaints.category,
                   complaints.status,
                   complaints.created_at,
                   users.name as citizen_name
            FROM complaints
            JOIN users
            ON complaints.user_id = users.id
            ORDER BY complaints.created_at DESC
            """
        )

        result = cursor.fetchall()

        conn.close()

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------
# ADMIN UPDATE STATUS
# -----------------------------
@app.put("/complaints/{complaint_id}")
def update_status(complaint_id: int, data: dict):

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE complaints
            SET status=%s
            WHERE id=%s
            """,
            (
                data["status"],
                complaint_id
            )
        )

        conn.commit()
        conn.close()

        return {
            "message": "Status updated successfully"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))