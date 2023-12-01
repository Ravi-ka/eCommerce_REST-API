export default class UserModel {
  constructor(id, name, email, password, userType) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.userType = userType;
    this.id = id;
  }

  static SignUp(name, email, password, userType) {
    const newUser = { name, email, password, userType };
    newUser.id = userData.length + 1;
    userData.push(newUser);
    console.log(userData);
    return newUser;
  }

  static SignIn(email, password) {
    const checkUser = userData.find(
      (u) => u.email == email && u.password == password
    );
    return checkUser;
  }

  static getAllUsers() {
    return userData;
  }
}

let userData = [
  new UserModel(1, "Seller User", "seller@test.com", "testseller", "seller"),
  new UserModel(
    2,
    "Customer User",
    "customer@test.com",
    "testcustomer",
    "customer"
  ),
];
