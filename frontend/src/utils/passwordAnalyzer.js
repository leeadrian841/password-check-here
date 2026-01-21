// Common passwords and patterns database
const COMMON_PASSWORDS = [
  'password', '123456', '12345678', 'qwerty', 'abc123', 'monkey', '1234567', 'letmein',
  'trustno1', 'dragon', 'baseball', 'iloveyou', 'master', 'sunshine', 'ashley', 'bailey',
  'passw0rd', 'shadow', '123123', '654321', 'superman', 'qazwsx', 'michael', 'football',
  'password1', 'password123', 'admin', 'welcome', 'login', 'admin123', 'root', 'toor',
];

// Expanded breach database - simulating real breach databases like HaveIBeenPwned
const BREACHED_PASSWORDS = [
  // Top breached passwords from real data breaches
  'password', '123456', '12345678', 'qwerty', 'abc123', '111111', 'monkey', '1234567',
  'letmein', 'trustno1', 'dragon', 'baseball', 'iloveyou', 'master', 'sunshine',
  'ashley', 'bailey', 'passw0rd', 'shadow', '123123', '654321', 'superman', 'qazwsx',
  'michael', 'football', 'password1', 'password123', 'admin', 'welcome', 'login',
  'admin123', 'root', 'toor', 'pass', 'test', 'guest', 'info', 'adm', 'mysql',
  'user', 'administrator', 'oracle', 'ftp', 'pi', 'puppet', 'ansible', 'ec2-user',
  'vagrant', 'azureuser', 'academico', 'acceso', 'access', 'accounting', 'action',
  'admin1', 'admin123456', 'administrator1', 'adobe123', 'adslolitec', 'adtran',
  'password!', 'password1!', 'Password1', 'Password123', 'Qwerty123', 'Abc123',
  '123456789', '1234567890', '12345', '123456a', '1234abcd', 'a123456', 'password1234',
  'qwerty123', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm', 'iloveyou1', 'welcome1',
];

const COMMON_PATTERNS = [
  /^(.)\1+$/, // All same characters
  /^(012|123|234|345|456|567|678|789|890)+/, // Sequential numbers
  /^(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)+/i, // Sequential letters
  /(.)\1{2,}/, // Repeated characters
];

const COMMON_WORDS = [
  'love', 'god', 'sex', 'life', 'king', 'queen', 'prince', 'princess', 'baby', 'angel',
  'computer', 'internet', 'bitcoin', 'hello', 'world', 'test', 'sample', 'demo',
];

// Calculate password entropy
function calculateEntropy(password) {
  let charSetSize = 0;
  
  if (/[a-z]/.test(password)) charSetSize += 26;
  if (/[A-Z]/.test(password)) charSetSize += 26;
  if (/[0-9]/.test(password)) charSetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charSetSize += 32;
  
  return password.length * Math.log2(charSetSize);
}

// Calculate time to crack
function calculateTimeToCrack(entropy) {
  // Assuming 10 billion guesses per second (modern GPU)
  const guessesPerSecond = 10000000000;
  const possibleCombinations = Math.pow(2, entropy);
  const seconds = possibleCombinations / (guessesPerSecond * 2); // Divide by 2 for average
  
  if (seconds < 1) return { seconds, display: 'Instant' };
  if (seconds < 60) return { seconds, display: `${Math.round(seconds)} seconds` };
  if (seconds < 3600) return { seconds, display: `${Math.round(seconds / 60)} minutes` };
  if (seconds < 86400) return { seconds, display: `${Math.round(seconds / 3600)} hours` };
  if (seconds < 2592000) return { seconds, display: `${Math.round(seconds / 86400)} days` };
  if (seconds < 31536000) return { seconds, display: `${Math.round(seconds / 2592000)} months` };
  if (seconds < 3153600000) return { seconds, display: `${Math.round(seconds / 31536000)} years` };
  
  return { seconds, display: 'Centuries' };
}

// Analyze password strength
export function analyzePassword(password) {
  const length = password.length;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  
  const characterTypes = [hasLowercase, hasUppercase, hasNumbers, hasSpecial].filter(Boolean).length;
  const uniqueChars = new Set(password).size;
  const entropy = calculateEntropy(password);
  const timeToCrack = calculateTimeToCrack(entropy);
  
  const vulnerabilities = [];
  const suggestions = [];
  let score = 0;
  
  // Length scoring
  if (length < 8) {
    vulnerabilities.push('Password is too short (minimum 8 characters)');
    suggestions.push('Use at least 12 characters for better security');
    score += length * 2;
  } else if (length < 12) {
    suggestions.push('Consider using 12+ characters for optimal security');
    score += length * 3;
  } else if (length < 16) {
    score += length * 4;
  } else {
    score += length * 5;
  }
  
  // Character diversity scoring
  if (!hasLowercase) {
    vulnerabilities.push('No lowercase letters');
    suggestions.push('Add lowercase letters (a-z)');
  } else {
    score += 5;
  }
  
  if (!hasUppercase) {
    vulnerabilities.push('No uppercase letters');
    suggestions.push('Add uppercase letters (A-Z)');
  } else {
    score += 5;
  }
  
  if (!hasNumbers) {
    vulnerabilities.push('No numbers');
    suggestions.push('Add numbers (0-9)');
  } else {
    score += 5;
  }
  
  if (!hasSpecial) {
    vulnerabilities.push('No special characters');
    suggestions.push('Add special characters (!@#$%^&*)');
  } else {
    score += 10;
  }
  
  // Common password check
  if (COMMON_PASSWORDS.some(common => password.toLowerCase().includes(common))) {
    vulnerabilities.push('Contains common password pattern');
    suggestions.push('Avoid using common passwords');
    score -= 20;
  }
  
  // Common words check
  if (COMMON_WORDS.some(word => password.toLowerCase().includes(word))) {
    vulnerabilities.push('Contains common dictionary word');
    suggestions.push('Avoid using dictionary words');
    score -= 10;
  }
  
  // Pattern detection
  let hasPatterns = false;
  for (const pattern of COMMON_PATTERNS) {
    if (pattern.test(password)) {
      vulnerabilities.push('Contains predictable pattern or sequence');
      suggestions.push('Avoid sequential or repeated characters');
      score -= 15;
      hasPatterns = true;
      break;
    }
  }
  
  // Unique characters bonus
  const uniqueRatio = uniqueChars / length;
  if (uniqueRatio < 0.5) {
    vulnerabilities.push('Too many repeated characters');
    score -= 10;
  } else {
    score += Math.round(uniqueRatio * 10);
  }
  
  // Entropy bonus
  score += Math.min(Math.round(entropy / 2), 30);
  
  // Normalize score to 0-100
  score = Math.max(0, Math.min(100, score));
  
  // Determine strength level
  let strength;
  if (score < 30) strength = 'weak';
  else if (score < 50) strength = 'fair';
  else if (score < 70) strength = 'good';
  else if (score < 85) strength = 'strong';
  else strength = 'excellent';
  
  return {
    score,
    strength,
    length,
    hasLowercase,
    hasUppercase,
    hasNumbers,
    hasSpecial,
    characterTypes,
    uniqueChars,
    entropy,
    timeToCrack,
    vulnerabilities,
    suggestions,
    hasPatterns,
  };
}