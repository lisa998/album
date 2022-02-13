export function auth(result, unauthorizedCb, authorizedCb) {
  if (result.data.success === false) {
    unauthorizedCb();
    alert(result.data.message);
  } else {
    authorizedCb();
  }
}
