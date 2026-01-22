#!/usr/bin/env python3
"""
Backend API Testing for PassGuard AI Password Strength Checker
Tests the password breach check API endpoint
"""

import requests
import json
import uuid
import time
from typing import Dict, Any

# Get backend URL from frontend .env file
BACKEND_URL = "https://pwd-safety-check.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

def test_api_endpoint(endpoint: str, method: str = "GET", data: Dict[Any, Any] = None, expected_status: int = 200) -> Dict[Any, Any]:
    """
    Test an API endpoint and return the response
    """
    url = f"{API_BASE}{endpoint}"
    
    try:
        if method == "POST":
            response = requests.post(url, json=data, timeout=30)
        elif method == "GET":
            response = requests.get(url, timeout=30)
        else:
            raise ValueError(f"Unsupported method: {method}")
        
        print(f"\n{'='*60}")
        print(f"Testing: {method} {url}")
        if data:
            print(f"Request Data: {json.dumps(data, indent=2)}")
        print(f"Status Code: {response.status_code}")
        print(f"Expected Status: {expected_status}")
        
        # Try to parse JSON response
        try:
            response_json = response.json()
            print(f"Response: {json.dumps(response_json, indent=2)}")
        except:
            print(f"Response Text: {response.text}")
            response_json = {"error": "Invalid JSON response", "text": response.text}
        
        # Check if status code matches expected
        status_ok = response.status_code == expected_status
        print(f"Status Check: {'✅ PASS' if status_ok else '❌ FAIL'}")
        
        return {
            "success": status_ok,
            "status_code": response.status_code,
            "response": response_json,
            "url": url
        }
        
    except requests.exceptions.RequestException as e:
        print(f"\n{'='*60}")
        print(f"Testing: {method} {url}")
        print(f"❌ REQUEST FAILED: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "url": url
        }

def test_password_breach_api():
    """
    Test the password breach check API with various test cases
    """
    print("\n" + "="*80)
    print("TESTING PASSWORD BREACH CHECK API")
    print("="*80)
    
    test_results = []
    
    # Test 1: Common passwords that should be breached
    print("\n🔍 TEST 1: Common passwords (should be breached)")
    common_passwords = ["123456", "password", "123", "qwerty", "abc123"]
    
    for pwd in common_passwords:
        result = test_api_endpoint(
            "/check-password-breach",
            "POST",
            {"password": pwd},
            200
        )
        
        if result["success"]:
            response = result["response"]
            # Check if response has expected fields
            has_required_fields = all(key in response for key in ["is_breached", "breach_count", "message", "source"])
            is_breached_correctly = response.get("is_breached") == True
            has_breach_count = response.get("breach_count", 0) > 0
            correct_source = response.get("source") == "HaveIBeenPwned"
            
            test_passed = has_required_fields and is_breached_correctly and has_breach_count and correct_source
            
            print(f"Password '{pwd}': {'✅ PASS' if test_passed else '❌ FAIL'}")
            if not test_passed:
                print(f"  - Required fields: {'✅' if has_required_fields else '❌'}")
                print(f"  - Is breached: {'✅' if is_breached_correctly else '❌'}")
                print(f"  - Has breach count > 0: {'✅' if has_breach_count else '❌'}")
                print(f"  - Correct source: {'✅' if correct_source else '❌'}")
        else:
            test_passed = False
            print(f"Password '{pwd}': ❌ FAIL (API Error)")
        
        test_results.append({
            "test": f"Common password: {pwd}",
            "passed": test_passed,
            "result": result
        })
        
        # Small delay to avoid rate limiting
        time.sleep(0.5)
    
    # Test 2: Strong unique passwords (should NOT be breached)
    print("\n🔍 TEST 2: Strong unique passwords (should NOT be breached)")
    strong_passwords = [
        "XyZ@9#mK$pL2!vN7",  # Random strong password
        str(uuid.uuid4()) + "!@#$%",  # UUID-like string with special chars
        "Th1s1sAV3ryStr0ngP@ssw0rd2024!"  # Complex password
    ]
    
    for pwd in strong_passwords:
        result = test_api_endpoint(
            "/check-password-breach",
            "POST",
            {"password": pwd},
            200
        )
        
        if result["success"]:
            response = result["response"]
            # Check if response has expected fields
            has_required_fields = all(key in response for key in ["is_breached", "breach_count", "message", "source"])
            is_not_breached = response.get("is_breached") == False
            breach_count_zero = response.get("breach_count", -1) == 0
            correct_source = response.get("source") == "HaveIBeenPwned"
            
            test_passed = has_required_fields and is_not_breached and breach_count_zero and correct_source
            
            print(f"Password '{pwd[:10]}...': {'✅ PASS' if test_passed else '❌ FAIL'}")
            if not test_passed:
                print(f"  - Required fields: {'✅' if has_required_fields else '❌'}")
                print(f"  - Is NOT breached: {'✅' if is_not_breached else '❌'}")
                print(f"  - Breach count is 0: {'✅' if breach_count_zero else '❌'}")
                print(f"  - Correct source: {'✅' if correct_source else '❌'}")
        else:
            test_passed = False
            print(f"Password '{pwd[:10]}...': ❌ FAIL (API Error)")
        
        test_results.append({
            "test": f"Strong password: {pwd[:10]}...",
            "passed": test_passed,
            "result": result
        })
        
        # Small delay to avoid rate limiting
        time.sleep(0.5)
    
    # Test 3: Edge cases
    print("\n🔍 TEST 3: Edge cases")
    
    # Empty password (should return 400 error)
    result = test_api_endpoint(
        "/check-password-breach",
        "POST",
        {"password": ""},
        400
    )
    
    empty_password_test = result["success"]
    print(f"Empty password (400 error): {'✅ PASS' if empty_password_test else '❌ FAIL'}")
    test_results.append({
        "test": "Empty password edge case",
        "passed": empty_password_test,
        "result": result
    })
    
    # Very long password (100+ characters)
    long_password = "A" * 150 + "!@#$%^&*()"
    result = test_api_endpoint(
        "/check-password-breach",
        "POST",
        {"password": long_password},
        200
    )
    
    if result["success"]:
        response = result["response"]
        has_required_fields = all(key in response for key in ["is_breached", "breach_count", "message", "source"])
        long_password_test = has_required_fields
    else:
        long_password_test = False
    
    print(f"Very long password (150+ chars): {'✅ PASS' if long_password_test else '❌ FAIL'}")
    test_results.append({
        "test": "Very long password edge case",
        "passed": long_password_test,
        "result": result
    })
    
    # Test 4: Basic API health check
    print("\n🔍 TEST 4: API Health Check")
    health_result = test_api_endpoint("/", "GET", None, 200)
    health_test = health_result["success"]
    print(f"API Health Check: {'✅ PASS' if health_test else '❌ FAIL'}")
    test_results.append({
        "test": "API Health Check",
        "passed": health_test,
        "result": health_result
    })
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    total_tests = len(test_results)
    passed_tests = sum(1 for test in test_results if test["passed"])
    failed_tests = total_tests - passed_tests
    
    print(f"Total Tests: {total_tests}")
    print(f"Passed: {passed_tests} ✅")
    print(f"Failed: {failed_tests} ❌")
    print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
    
    if failed_tests > 0:
        print("\n❌ FAILED TESTS:")
        for test in test_results:
            if not test["passed"]:
                print(f"  - {test['test']}")
    
    return test_results

if __name__ == "__main__":
    print("Starting Backend API Tests for PassGuard AI Password Strength Checker")
    print(f"Backend URL: {BACKEND_URL}")
    
    # Run password breach API tests
    results = test_password_breach_api()
    
    print("\n" + "="*80)
    print("TESTING COMPLETE")
    print("="*80)