const Router = require('koa-router');
const jwt = require('koa-jwt');
const { secret } = require('../config');
const usersCtl = require('../controllers/users');

const router = new Router({ prefix: '/users' });

const auth = jwt({ secret });

router.get('/', usersCtl.find);
router.post('/', usersCtl.create);

router.get('/:id', usersCtl.findById);
router.patch('/:id', auth, usersCtl.checkOwner, usersCtl.update);
router.delete('/:id', auth, usersCtl.checkOwner, usersCtl.delete);

router.post('/login', usersCtl.login);

router.get('/:id/following', usersCtl.listFollowing);
router.get('/:id/follower', usersCtl.listFollowers);
router.put('/following/:id', auth, usersCtl.checkUserExist, usersCtl.follow);
router.delete('/following/:id', auth, usersCtl.checkUserExist, usersCtl.unfollow);

module.exports = router;
