class User {
    constructor({ userId, name, email, roleId, statusId,password }) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.roleId = roleId;
    this.statusId = statusId;
    this.password = password;
  }
}

module.exports = User;