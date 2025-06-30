from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class Selenium:
  def __init__(self, url):
    self.driver = webdriver.Chrome()
    self.launch_selenium(url)

  def launch_selenium(self, url):
    self.driver.get(url)

  def get_element(self, by, name):
    WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((by, name)))
    return self.driver.find_element(by, name)

  def write_to_element(self, text, by, name):
    element = self.get_element(by, name)
    element.send_keys(text)

  def click_to_element(self, by, name):
    element = self.get_element(by, name)
    element.click()

  def wait(self):
    WebDriverWait(self.driver, 1000)
