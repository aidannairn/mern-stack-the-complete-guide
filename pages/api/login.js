import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import connectDb from '../../utils/connectDb'
import User from '../../models/User'

connectDb()

export default async (req, res) => {
  const { email, password } = req.body
  try {
    // 1) Check to see if a user already exists with the provided email.
    const user = await User.findOne({ email }).select('+password')
    // 2) If email does not already exist, return error.
    if (!user) {
      return res.status(404).send('No user exists with that email.')
    }
    // 3) Check to see if the user's password matches the one in database.
    const passwordsMatch = await bcrypt.compare(password, user.password)
    // 4) If password matches, generate a token.
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      })
      // 5) Send token to the client.
      res.status(200).json(token)
    } else {
      res.status(401).send('The password you entered is incorrect.')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Error logging on user.')
  }
}
