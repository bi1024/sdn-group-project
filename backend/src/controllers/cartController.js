import * as cartService from "../services/cartService.js";

//Lấy cart theo userId
export const getCart = async (req, res) => {
    try{
        const cart = await cartService.getCart(req.userID);
        res.status(200).json({cart: cart} || {item: []});
    }catch(err) {
        res.status(500).json({error: "Internal Server Error"});
    };
};

//Add sách vào Cart
export const addToCart = async (req, res) => {
    try{
        const {bookId, quantity} = req.body;
        const id = req.userID;
        console.log({id});
        const addCart = await cartService.addToCart(req.userID, bookId, quantity);

        // Tìm sách vừa được thêm vào giỏ hàng (mục vừa được thêm hoặc cập nhật)
        const addedItem = addCart.items.find(item => item.bookId.equals(bookId));
        res.status(200).json({message: "Thêm sách vào Cart thành công", addedItem});
    }catch(err) {
        res.status(500).json({error: "Internal Server Error"});
    };
};

//Cập nhật số lượng sách trong cart
export const updateCart = async (req, res) => {
    try{
        const {quantity, bookId} = req.body;
        const updated = await cartService.updateCart(req.userID, bookId, quantity);

        if(!updated){
            res.status(404).json({ error: "Không tìm thấy sách" });
        }

        res.status(200).json(updated);

    }catch(err) {
        res.status(500).json({error: "Internal Server Error"});
    };
};

//Xoá 1 sách ra khỏi cart
export const removeFromCart = async (req, res) => {
    try{
        await cartService.removeFromCart(req.userID, req.body.bookId);
        res.status(200).json({message: "Xoá sách thành công" });
    }catch(err) {
        res.status(500).json({error: "Internal Server Error"});
    };
};

//Xoá tất cả ra khỏi Cart hoặc xoá nhiều sách 1 lúc
export const removeMultiFromCart = async (req, res) => {
    try{
        const {bookIds} = req.body;
        await cartService.removeMultiFromCart(req.userID, bookIds);
        res.status(200).json({message: 'Xoá nhiều sách thành công'});
    }catch(err) {
        res.status(500).json({error: "Internal Server Error"});
    };
};


