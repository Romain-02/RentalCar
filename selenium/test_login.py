from selenium_class import Selenium
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


URL="http://localhost:4200"
NAME_USER="newUser"
EMAIL_USER="newUser@gmail.com"
PASSWORD_USER="motDePasse"


driver = Selenium(URL)

#register
driver.click_to_element(By.XPATH, '//span[text()="Inscription"]')
driver.write_to_element(NAME_USER, By.NAME, 'name')
driver.write_to_element(EMAIL_USER, By.NAME, 'email')
driver.write_to_element(PASSWORD_USER, By.NAME, 'password')
driver.click_to_element(By.XPATH, '//button[span[text()="S\'inscrire"]]')

#connection
driver.click_to_element(By.XPATH, '//span[text()="Connexion"]')
driver.write_to_element(EMAIL_USER, By.NAME, 'email')
driver.write_to_element(PASSWORD_USER, By.NAME, 'password')
driver.write_to_element(Keys.TAB, By.NAME, 'password')
driver.click_to_element(By.XPATH, '//button[span[text()="Login"]]')

try:
  driver.get_element(By.XPATH, '//span[text()="Déconnexion"]')
  print("Vous vous êtes connecter avec succès")
  driver.wait()
except:
  print("Il y a eu une erreur dans la connexion")

