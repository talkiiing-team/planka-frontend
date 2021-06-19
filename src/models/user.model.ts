interface UserModel extends Record<string, string> {
  name: string
  login: string
  role: string
  _id: string
}

export default UserModel
