from flask import Flask, jsonify, request, abort, json
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

POSTS = [
    {"id": 1, "title": "First post", "content": "This is the first post."},
    {"id": 2, "title": "Second post", "content": "This is the second post."},
]


@app.route('/api/posts', methods=['GET','POST'])
def get_and_post_posts():
    if request.method == 'GET':
        return jsonify(POSTS)
    elif request.method == 'POST':
        try:
            new_post = request.get_json()
        except Exception as e:
            print(e)   
        unique_id = uuid.uuid4().int % 1_000_000
        print(unique_id)
        print(type(unique_id))
        new_post['id'] = unique_id
        POSTS.append(new_post)
        return jsonify({"message": "Post added successfully!", "post": new_post}), 201


@app.route('/api/posts/<id>', methods=['DELETE','PUT'])
def delete_post(id):
    if request.method == 'DELETE':
        try:
            for post in POSTS:
                if int(post.get("id")) == int(id):
                    POSTS.remove(post)
                    return {"message": f"Post with id {id} has been deleted successfully."}, 200
        except Exception as e:
            print(e)
        return jsonify({"message": "Post not found"}) ,404
    elif request.method == 'PUT':
        try:
            update = request.get_json()
            title = update['title']
            content = update['content']
        except Exception as e:
            print(e)    
        if title and content:    
            for post in POSTS:
                if int(post.get("id")) == int(id):
                    post['title'] = title
                    post['content'] = content
                    return {
                            "id": post['id'],
                            "title": post['title'],
                            "content": post['content']
                        }, 200
                else:
                    return jsonify("404 Not found"), 404
        else: 
            return jsonify("400 Bad Request"), 400


@app.route('/api/posts/search', methods=['GET'])
def search_post():
    list_of_post = []
    title = request.args.get('title', '').lower().strip()
    content = request.args.get('content', '').lower().strip()

    if not title and not content:
        return jsonify({"message": "Please provide at least one search term (title or content)."}), 400

    for post in POSTS:
        title_match = title in post['title'].lower() if title else False
        content_match = content in post['content'].lower() if content else False
        if title_match and content_match:
            list_of_post.append(post)
        elif title_match:
            list_of_post.append(post)
        elif content_match:
            list_of_post.append(post)
    if not list_of_post:
        return jsonify({"message": "No posts found matching the search criteria."}), 404
    return jsonify(list_of_post)

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5002, debug=True)


