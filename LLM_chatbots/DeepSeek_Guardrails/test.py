import requests

try:
    print("testing server...")
    base_response = requests.get("https://medical-chatbot-gtdl.onrender.com/")
    print(f"الحالة: {base_response.status_code}")
    print(f"الرد: {base_response.json()}")
    
    print("\ntesting chat...")
    chat_response = requests.post(
        "https://medical-chatbot-gtdl.onrender.com/chat",
        json={
            "message": "Hi, how can you help me?",
            "conversation_history": []
        },
        timeout=30
    )
    print(f"conversation status: {chat_response.status_code}")
    print(f"reply: {chat_response.json()}")
    
except requests.exceptions.Timeout:
    print("timeout")
except requests.exceptions.ConnectionError:
    print("cannot connect to the server")
except Exception as e:
    print(f"error {e}")