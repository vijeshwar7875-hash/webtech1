import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def run_test():
    # Initialize the WebDriver (adjust options if using headless mode)
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(options=options)
    
    # Define an explicit wait instance (max 10 seconds)
    wait = WebDriverWait(driver, 10)

    try:
        # ==========================================
        # [STEP 1] Page loaded. Searching elements...
        # ==========================================
        print("[STEP 1] Page loaded. Searching for input elements...")
        driver.get("http://localhost:5210/login.html")
        
        # Explicitly wait for input fields to be interactive (by ID)
        username_field = wait.until(EC.element_to_be_clickable((By.ID, "username")))
        print("-> Found Username Field successfully.")
        
        password_field = driver.find_element(By.ID, "password")
        print("-> Found Password Field successfully.")
        
        # Adjust selector based on HTML
        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        print("-> Found Login Button successfully.")

        # ==========================================
        # [STEP 2] Typing credentials & clicking...
        # ==========================================
        print("[STEP 2] Typing credentials and clicking login...")
        username_field.send_keys("admin")
        password_field.send_keys("password")
        login_button.click()
        print("-> Login button clicked.")

        # ==========================================
        # [STEP 3] Validating redirection & state
        # ==========================================
        print("[STEP 3] Validating redirection and application state...")
        
        # Explicitly wait until the Dashboard heading appears in the DOM
        dashboard_heading = wait.until(
            EC.visibility_of_element_located((By.XPATH, "//h2[text()='Dashboard']"))
        )
        
        current_url = driver.current_url
        print(f"-> Redirect successful. Current landing URL: {current_url}")
        
        # Assert or verify elements on the newly loaded page
        record_count = driver.find_element(By.CLASS_NAME, "count-number").text
        print(f"-> Verification Success! Total records shown: {record_count}")
        print("\n=== [TEST PASSED] ===")

    except Exception as e:
        print("\n=== [TEST FAILED] Execution Halting Error ===")
        print(f"Error Details: {str(e)}")
        
    finally:
        # Keep the browser open for 3 seconds to visually inspect before closing
        time.sleep(3)
        driver.quit()

if __name__ == "__main__":
    run_test()
