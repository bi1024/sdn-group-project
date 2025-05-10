import User from "../models/userSchema.js";

// Lấy thông tin user theo ID
export async function getProfile(req, res) {
    try {
        const userID = req.params.id; // Lấy ID từ URL
        const user = await User.findById(userID).select("-hashedPassword"); // Bỏ password ra khỏi kết quả
        console.log(userID)
        console.log(user._id)
        if (!user) {
            return res.status(404).json({ errors: "User không tồn tại!" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ errors: "Lỗi server", details: error.message });
    }
}
// Cập nhật thông tin user
export async function updateProfile(req, res) {
    try {
        const userID = req.params.id;
        const updateData = req.body;

        // Không cho phép cập nhật email hoặc hashedPassword
        delete updateData.email;
        delete updateData.hashedPassword;

        const updatedUser = await User.findByIdAndUpdate(
            userID, 
            updateData, 
            { 
                new: true, // Trả về dữ liệu sau khi cập nhật
                runValidators: true // Kiểm tra validation
            }
        ).select("-hashedPassword"); 

        if (!updatedUser) {
            return res.status(404).json({ errors: "Không tìm thấy user!" });
        }

        res.status(200).json({ message: "Cập nhật thành công!", user: updatedUser });
    } catch (error) {
        res.status(500).json({ errors: "Lỗi server", details: error.message });
    }
}