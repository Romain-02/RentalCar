from selenium_class import Selenium
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import string
import random


URL="http://localhost:4200"
NAME_USER=''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(30))
EMAIL_USER=NAME_USER + "@gmail.com"
PASSWORD_USER="motDePasse"

client_info = {
  'firstname': 'firstname',
  'lastname': 'lastname',
  'city': 'Paris',
  'country': 'France',
  'postalCode': '55555',
  'phone': '123-456-7891',
  'billingAdress': '405 rue de test',
}

driver_info = {
  'birthDate': '02-05-2000',
  'drivingLicenseNumber': 'abcd12345',
  'drivingLicenseAcquisition': '02-05-2018',
  'drivingLicenseValidation': '02-06-2018',
  'drivingLicenseCountry': 'France'
}

driver = Selenium(URL)

def rent():
  driver.click_to_element(By.XPATH, '//span[text()="Réserver maintenant"]')
  driver.click_to_element(By.XPATH, '//button[contains(., "Réserver")]')

def choose_guarantee():
  driver.click_to_element(By.XPATH, '//h4[contains(text(), "Garantie #1")]')
  driver.click_to_element(By.XPATH, '//span[contains(text(), "Date de départ :")]')
  driver.write_to_element('01082025', By.XPATH, '//label[contains(., "Date de départ :")]')
  driver.click_to_element(By.XPATH, '//span[contains(text(), "Date de fin :")]')
  driver.write_to_element('01082025', By.XPATH, '//label[contains(., "Date de fin :")]')
  driver.click_to_element(By.XPATH, '//button[text()=" Continuer vers les options "]')


def choose_option():
  driver.click_to_element(By.XPATH, '//div[contains(@class, "option-item") and contains(., "Siège bébé")]')
  driver.click_to_element(By.XPATH, '//h4[contains(text(), "GPS intégré")]')
  driver.click_to_element(By.XPATH, '//button[contains(text(), " Finaliser la réservation ")]')

def fill_register():
  driver.click_to_element(By.ID, 'name')
  driver.write_to_element(NAME_USER, By.ID, 'name')
  driver.click_to_element(By.ID, 'email')
  driver.write_to_element(EMAIL_USER, By.ID, 'email')
  driver.click_to_element(By.ID, 'password')
  driver.write_to_element(PASSWORD_USER, By.ID, 'password')
  driver.click_to_element(By.XPATH, '//span[contains(., "Next")]')

def fill_client_info():
  fields = ['firstname','lastname', 'city', 'country', 'postalCode', 'phone', 'billingAdress']
  time.sleep(2)

  for field in fields:
    driver.click_to_element(By.ID, field)
    driver.write_to_element(client_info[field], By.NAME, field)
  driver.click_to_element(By.XPATH, '//span[contains(., "Next")]')

def fill_driver_info():
  fields = ['birthDate','drivingLicenseNumber', 'drivingLicenseAcquisition', 'drivingLicenseValidation', 'drivingLicenseCountry']

  for field in fields:
    driver.click_to_element(By.ID, field)
    driver.write_to_element(driver_info[field], By.NAME, field)
  driver.click_to_element(By.XPATH, '//span[contains(., "Enregistrer")]')


def complete_rental():
  driver.click_to_element(By.XPATH, '//button[contains(text(), "Réserver")]')


#louer
rent()
choose_guarantee()
choose_option()
fill_register()
fill_client_info()
fill_driver_info()
complete_rental()

try:
  driver.get_element(By.XPATH, '//div[contains(., "firstname")]')
  print("Vous avez réserver une voiture avec succès")
  driver.wait()
except:
  print("Il y a eu une erreur dans la connexion")
  driver.wait()

