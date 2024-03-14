
from rest_framework.test import APITestCase
from rest_framework import status
# Create your tests here.

class accountTest(APITestCase):
    def test_account1(self):
        response = self.client.post('/register/',{"email" : "sample@gmail.com","password1" : "qwer1245","password2" : "qwer1245"})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
    def test_account2(self):
        response = self.client.post('/register/',{"email" : "sample@gmail.com","password1" : "qwer1245","password2" : "qwer1245"})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.client.post('/login/',{"email" : "sample@gmail.com","password" : "qwer1245"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    def test_account3(self):
        response = self.client.post('/register/',{"email" : "sample@gmail.com","password1" : "qwer1245","password2" : "qwer1245"})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.client.post('/login/',{"email" : "sample@gmail.com","password" : "qwer1245"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.post('/getid',{"email" : "sample@gmail.com"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    def test_account4(self):
        response = self.client.post('/register/',{"email" : "sample@gmail.com","password1" : "qwer1245","password2" : "1245"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    def test_account5(self):
        response = self.client.post('/register/',{"email" : "sample","password1" : "qwer1245","password2" : "qwer1245"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    def test_account6(self):
        response = self.client.post('/register/',{"email" : "sample@gmail.com","password1" : "qwer1245","password2" : "qwer1245"})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.client.post('/login/',{"email" : "sample@gmail.com","password" : "1245"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    def test_account7(self):
        response = self.client.post('/register/',{"email" : "sample@gmail.com","password1" : "qwer1245","password2" : "qwer1245"})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.client.post('/login/',{"email" : "sample","password" : "qwer1245"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
