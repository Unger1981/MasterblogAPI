# Use a base image with Python installed 
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy requirements.txt into the container
COPY requirements.txt .

# Install the dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your app's code into the container
COPY . .

# Expose port 5000 to allow access to the Flask app
EXPOSE 5000

# Command to run the app (use Gunicorn for production)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
