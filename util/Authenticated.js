import jwt from 'jsonwebtoken'

function Authenticated(icomponent) {
    return (req, res) => {
      const { authorization } = req.headers
      if (!authorization) {
        return res.status(401).json({ error: "you must login" });
      }
      try {
        
        jwt.verify( authorization, process.env.JWT_TOKEN, function(err, decoded) {
          if (err) {
              err = {
                name: 'TokenExpiredError',
                message: 'jwt expired',
                expiredAt: 1408621000
              }
            
          }
        });

        // console.log(verify);
        const { userid } = jwt.verify( authorization, process.env.JWT_TOKEN,);
        console.log(userid)
        req.userid = userid;
        return icomponent(req, res);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'you must login' });
      }
    };
  }


  export default Authenticated