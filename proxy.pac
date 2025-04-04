function FindProxyForURL(url, host) {
  // 判断是否是本地主机名 (不包含 ".")
  if (isPlainHostName(host)) {
    return "DIRECT";
  }

  // 判断是否是局域网 IP 地址范围
  if (isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
      isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") ||
      isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0")) {
    return "DIRECT";
  }

  // 其余情况走代理，先尝试 SOCKS5，再尝试 HTTP，最后尝试直连
  return "SOCKS5 192.168.123.60:7891; HTTP 192.168.123.60:7890; DIRECT";
}