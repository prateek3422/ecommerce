import jwt from 'jsonwebtoken'

function Authenticated(icomponent) {
    return (req, res) => {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({ error: "you must login" });
      }
      try {
        const { userid } = jwt.verify( authorization, process.env.JWT_TOKEN);
        // console.log(userid)
        req.userid = userid;
        return icomponent(req, res);
      } catch (error) {
        
        return res.status(500).json({ error: 'internal error' });
      }
    };
  }


  export default Authenticated