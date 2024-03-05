
from rest_framework.test import APITestCase
from rest_framework import status
# Create your tests here.

class loggingTest(APITestCase):
    def test_log1(self):
        response = self.client.post('/log/',{"user_id" : 1,"steps" : 100,"pushups" : 100,"situps": 100,"squarts": 100,"lunges":100})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    def test_log2(self):
        response = self.client.post('/log/',{"user_id" : 1,"steps" : 100,"pushups" : 100,"situps": 100,"squarts": 100,"lunges":100})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.get('/log/1')
        self.assertEqual(len(response.data), 1)
    def test_log3(self):
        response = self.client.post('/log/',{"user_id" : 1,"steps" : 100,"pushups" : 100,"situps": 100,"squarts": 100,"lunges":100})
        response = self.client.post('/log/',{"user_id" : 1,"steps" : 100,"pushups" : 100,"situps": 100,"squarts": 100,"lunges":100})
        response = self.client.post('/log/',{"user_id" : 1,"steps" : 100,"pushups" : 100,"situps": 100,"squarts": 100,"lunges":100})
        response = self.client.post('/log/',{"user_id" : 1,"steps" : 100,"pushups" : 100,"situps": 100,"squarts": 100,"lunges":100})
        response = self.client.post('/log/',{"user_id" : 1,"steps" : 100,"pushups" : 100,"situps": 100,"squarts": 100,"lunges":100})
        response = self.client.post('/log/',{"user_id" : 1,"steps" : 100,"pushups" : 100,"situps": 100,"squarts": 100,"lunges":100})
        response = self.client.post('/log/',{"user_id" : 1,"steps" : 100,"pushups" : 100,"situps": 100,"squarts": 100,"lunges":100})
        response = self.client.post('/log/',{"user_id" : 1,"steps" : 100,"pushups" : 100,"situps": 100,"squarts": 100,"lunges":100})
        #8 datas
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.get('/log/1')
        self.assertEqual(len(response.data), 7)#response with 7 datas
    def test_log4(self):
        response = self.client.post('/log/',{"user_id" : 1,"steps" : 100,"pushups" : 100,"situps": 100,"squarts": 100,"lunges":100})
        response = self.client.post('/log/',{"user_id" : 1,"steps" : 100,"pushups" : 100,"situps": 100,"squarts": 100,"lunges":100})
        response = self.client.post('/log/',{"user_id" : 1,"steps" : 100,"pushups" : 100,"situps": 100,"squarts": 100,"lunges":100})
        response = self.client.post('/log/',{"user_id" : 1,"steps" : 100,"pushups" : 100,"situps": 100,"squarts": 100,"lunges":100})
        #4 datas
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.get('/log/1')
        self.assertEqual(len(response.data), 4)#response with 4 datas
