import jwt from 'jsonwebtoken';

export default {
  Query: {
    me: (parent, args, context) => {
      if (!context.token) {
        throw new Error('Unauthorized');
      }

      try {
        const decoded = jwt.verify(context.token, process.env.JWT_SECRET);

        return {
          userId: decoded.userId,
          username: decoded.username,
          email: decoded.email || ''
        };
      } catch (err) {
        throw new Error('Invalid token');
      }
    }
  }
};
