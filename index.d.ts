import * as http from 'http';
import * as https from 'https';
import * as tls from 'tls';

declare class HttpProxyingAgent extends http.Agent { }
declare class HttpsProxyingAgent extends https.Agent { }

declare interface ProxyingAgentOptions {
  // Specifies the proxy url.
  // The supported format is http[s]://[auth@]host:port where auth is the authentication information in the form of username:password.
  // The authentication information can also be in the form of a Base64 encoded user: password, e.g.http://dXNlcm5hbWU6cGFzc3dvcmQ=@proxy.example.com:8080.
  // If the username for NTLM needs to be in the domain\username format, specify domain % 5Cusername instead.
  proxy: string;

  // TLS connection options to use when the target server protocol is https.
  // See http://nodejs.org/api/tls.html#tls_tls_connect_options_callback for a list of available options.
  tlsOptions?: tls.ConnectionOptions;

  // Proxy authentication type.
  // Possible values are 'basic' and 'ntlm' ('default' is basic).
  authType?: 'basic' | 'ntlm';

  // (beta) applicable only if authType is 'ntlm'.
  ntlm?: {
    // (required) - the NTLM domain.
    domain: string;
    // (optional) - the local machine hostname (os.hostname() is not specified).
    workstation: string;
  };
}

// Returns a new agent configured correctly to proxy to the specified target.
export function create(proxy: string | https.AgentOptions & ProxyingAgentOptions, target: 'https:'): HttpsProxyingAgent;
export function create(proxy: string | http.AgentOptions & ProxyingAgentOptions, target: string): HttpProxyingAgent;

// Set a global agent to forward all HTTP and HTTPS requests through the specified proxy.
// Make sure to call this method before invoking any other HTTP request.
// After `globalize()` is invoked, all HTTP and HTTPS requests will automatically tunnel through the proxy.
export function globalize(proxy: string | https.AgentOptions & ProxyingAgentOptions | http.AgentOptions & ProxyingAgentOptions): void;
