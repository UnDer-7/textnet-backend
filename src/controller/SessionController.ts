import RouterConfig from '../config/RouterConfig';

const ROUTER = RouterConfig.getRouter();
const PATH = RouterConfig.buildURL('session');

ROUTER.post(`${PATH}/email`, (req, res) => {
  console.log('LOGIN EMAIL');
  return res.status(200).json({eae: 'eae'})
})

export default ROUTER;
