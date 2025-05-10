import Cart from "../models/cartSchema.js";

//Lấy cart theo userId
export const getCart = (userId) => {
  return Cart.findOne({ userId }).populate("items.bookId");
};

//Add sách vào Cart
export const addToCart = async (userId, bookId, quantity) => {
  let cart = await Cart.findOne({ userId });

  //Nếu không có cart thì tạo ra cart mới và item rỗng
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  //Tìm vị trí index của sách đó trong mảng items theo bookID
  const index = cart.items.findIndex((item) => item.bookId.equals(bookId));
  if (index > -1) {
    cart.items[index].quantity += quantity;
  } else {
    cart.items.push({ bookId, quantity });
  }

  console.log({ cart });
  return cart.save();
};

//Cập nhật số lượng sách trong cart
export const updateCart = async (userId, bookId, quantity) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return null;
  }

  const index = cart.items.findIndex((item) => item.bookId.equals(bookId));
  if (index === -1) {
    return null;
  }

  cart.items[index].quantity = quantity;
  return cart.save();
};

//Xoá 1 sách ra khỏi cart
export const removeFromCart = (userId, bookId) => {
  //updateOne dùng để cập nhật 1 document trong mongo
  return Cart.updateOne({ userId }, { $pull: { items: { bookId } } });
};

//Xoá tất cả ra khỏi Cart hoặc xoá nhiều sách 1 lúc
export const removeMultiFromCart = (userId, bookIds) => {
  return Cart.updateOne({ userId }, { $pull: { items: { bookId: { $in: bookIds } } } });
};
