class User {
    constructor({ userId, name, email, roleId, statusId }) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.roleId = roleId;
    this.statusId = statusId;
  }
}

module.exports = User;