const cacheStore = new Map();
const TTL_MS = 60 * 1000;

function cacheMiddleware(req, res, next) {
  if (req.method !== 'GET') {
    return next();
  }

  const key = req.originalUrl || req.url;
  const cached = cacheStore.get(key);
  const now = Date.now();

  if (cached) {
    const isExpired = (now - cached.createdAt) > TTL_MS;
    if (!isExpired) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached.data);
    }
    cacheStore.delete(key);
  }

  res.setHeader('X-Cache', 'MISS');
  const originalJson = res.json.bind(res);

  res.json = function (data) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cacheStore.set(key, {
        data,
        createdAt: Date.now()
      });
    }
    return originalJson(data);
  };

  next();
}

function invalidateCache() {
  cacheStore.clear();
}

module.exports = {
  cacheMiddleware,
  invalidateCache
};
