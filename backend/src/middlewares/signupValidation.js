import { isExistedUsername, isExistedEmail, isValidUsername, isValidEmail, isValidPassword } from "../services/acountValidation.js";

async function validateAccount(req, res, next) {
    const userData = req.body;
    if(!userData) {
        return res.status(400).json({errors: 'Không có data từ user'});
    }
    const { username, email, password, fullname, birthday, avatarUrl } = userData; // chưa validate 3 trường cuối

    let isValid;
    let isExisted;

    try {
        isValid = isValidUsername(username); 
        if(!isValid) return res.status(400).json({errors: 'Đăng ký không thành công! Username không hợp lệ'});
        
        isExisted = await isExistedUsername(username);
        if(isExisted) return res.status(400).json({errors: 'Đăng ký không thành công! Username đã tồn tại'});
    
        isValid = isValidEmail(email);
        if(!isValid) return res.status(400).json({errors: 'Đăng ký không thành công! Email không hợp lệ'});
    
        isExisted = await isExistedEmail(email)
        if(isExisted) return res.status(400).json({errors: 'Đăng ký không thành công! Email đã tồn tại'});
        
        isValid = isValidPassword(password);
        if(!isValid) return res.status(400).json({errors: 'Đăng ký không thành công! Password không hợp lệ'});

        next();

    } catch(err) {
        res.status(500).json(err);
    }
}

export default validateAccount;