import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Skip token for login & register
  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    return next(req);
  }

  const token = localStorage.getItem('token');

  if (token) {                            //HTTP requests are immutable i.e cannot be change in Angular.So must clone it:
    req = req.clone({          // Takes original request,  Creates a new request,   Adds the new header,  Leaves original request unchanged
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};




/* This interceptor:

✅ Automatically adds Authorization: Bearer <token> header
✅ Prevents you from manually adding token in every API call
✅ Secures backend APIs
✅ Skips token for login & register endpoints  */