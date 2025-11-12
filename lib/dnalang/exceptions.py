"""DNALang Exceptions"""

class DNALangException(Exception):
    """Base exception for DNALang framework"""
    pass

class AuthenticationError(DNALangException):
    """Raised when authentication fails"""
    pass

class RateLimitError(DNALangException):
    """Raised when rate limit is exceeded"""
    pass

class OperationError(DNALangException):
    """Raised when quantum operation fails"""
    pass

class ValidationError(DNALangException):
    """Raised when input validation fails"""
    pass

class BackendError(DNALangException):
    """Raised when quantum backend is unavailable"""
    pass
