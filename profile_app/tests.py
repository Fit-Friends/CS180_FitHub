import base64
import io
import os
from rest_framework.test import APITestCase
from rest_framework import status
from PIL import Image
# Create your tests here.

# Create your tests here.
class profileTest1(APITestCase):
    def test_profile1(self):
        imageUrl = ".\media\profile_pic\profile_pic_default.png" 
        response = self.client.post('/save-profile/',{"id_user" : 4,"username" : "sample","profile_pic": (os.path.basename(imageUrl), open(imageUrl, 'rb'))})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    def test_profile2(self):
        imageUrl = ".\media\profile_pic\profile_pic_default.png" 
        response = self.client.put('/change-image/',{"id_user" : 4,"username" : "sample","profile_pic": (os.path.basename(imageUrl), open(imageUrl, 'rb'))})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    def test_profile3(self):
        imageUrl = ".\media\profile_pic\profile_pic_default.png" 
        response = self.client.put('/change-name/',{"id_user" : 4,"username" : "sample","profile_pic": (os.path.basename(imageUrl), open(imageUrl, 'rb'))})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    def test_profile4(self):
        imageUrl = ".\media\profile_pic\profile_pic_default.png" 
        response = self.client.post('/save-profile/',{"id_user" : 4,"username" : "sample","profile_pic": (os.path.basename(imageUrl), open(imageUrl, 'rb'))})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.get('/return-profile/4')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    def test_profile5(self):
        imageUrl = ".\media\profile_pic\profile_pic_default.png" 
        response = self.client.post('/save-profile/',{"id_user" : 4,"username" : "sample","profile_pic":""})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
