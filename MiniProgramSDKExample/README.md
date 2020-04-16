# MiniProgram TaaS SDK


## Prerequisite

* node
* npm
* yarn

If you have not installed ```yarn```, please install it by running ```npm install -g yarn```. This may require root privilege.

## Setup

Please ensure that you have already run ```npm init``` in the root directory of your MiniProgram project. However, it is suggested that you should install this SDK _**before**_ you install any other npm modules, otherwise it may cause some side effects if you remove the directory ```node_modules``` (See the following steps).

First get the SDK project and place it in somewhere. Suppose that the root directory of the SDK project is ```/path/to/miniprogram-taas-sdk```

* Start the shell with the current working directory being the root directory of your MiniProgram project.
* ```npm install --save /path/to/miniprogram-taas-sdk```
* Remove the ```node_modules``` directory that is created by the command above.
* ```yarn install --flat```
* Build npm modules in the WeChat DevTools.

## Usage Example

```javascript
const sdk = require("miniprogram-taas-sdk");

const ic = "<invitation code>"
// Generate user credential
sdk.getCredential(ic, undefined, (err, data) => {
    if (err) return ;
    const kp = data;

    // Store evidence
    const message = {text: "test_message"};
    sdk.storeEvidence(message, undefined, kp, (err, data) => {
        if (err) return ;
        // Get the hash ID
        const hashId = data.hash;

        // Query evidence by hash ID
        sdk.queryEvidence(hashId, undefined, kp, (err, data) => {
            if (err) return ;
            // Get the response
            const _message = data.data.text;
            console.log(_message); // Expect: test_message
        });
    });
});


```

## API documentation

You can import the TaaS SDK in your MiniProgram by:
```javascript
const sdk = require("miniprogram-taas-sdk");
```

### sdk.version

Return the version of TaaS SDK.

The return value is a string which is formatted as ```"<major version>.<minor version>.<revision>"``` such as ```"0.0.1"```.

### sdk.getServerAddr()

Return an address of a TaaS backend server. If there are multiple available servers, return a *random* one. Different call to this function may return different server addresses, unless there is only one server avaiable.

The return value is a string, which is formatted as ```"<scheme>://<domain>"```, such as ```"http://example.com"```.

### sdk.getCredential(invitationCode, serverAddress, callback)

Generate a pair of credential keys, which contains a public key, a private key, and an API access token.

The ```invitationCode``` is the invitation code string.

The ```serverAddress``` can be a string that returned by ```sdk.getServerAddr()```, which specify the server address. It also can be ```undefined``` (recommended), which means that the server address will be chosen by the SDK itself.

The ```callback``` should be a function, which will be called when the server has responded the ```sdk.storeEvidence``` request.
It will be called as ```callback(err, obj)```, and the format of the parameter ```obj``` is:
```typescript
{ publicKey: string, privateKey: string, credential: string }
```
The public key can identify a user.

This function itself does not return any value.

### sdk.storeEvidence(data, serverAddress, credential, callback)

Store evidence of the data in the TaaS backend.

The ```data``` can be a object, which has the format:
```typescript
{
    path?: string,
    text?: string
}
```
The ```data.path``` is the path to the file which is going to be stored.
The ```data.text``` is the message to be stored along with the file.
You should provide at least a file or a message to be stored. When one in ```data.path``` and ```data.text``` is provided, the other one can be missing. 

The ```serverAddress``` can be a string that returned by ```sdk.getServerAddr()```, which specify the server address. It also can be ```undefined``` (recommended), which means that the server address will be chosen by the SDK itself.

The ```credential``` should be an object that is returned by ```sdk.getCredential()```.

The ```callback``` should be a function, which will be called when the server has responded the ```sdk.storeEvidence``` request.
It will be called as ```callback(err, obj)```, and the format of the parameter ```obj``` is:
```typescript
{
    hash: string,
    sig: string
}
```
The ```hash``` is the hash ID of the stored evidence, and the ```sig``` is the signature of the stored evidence.

This function itself does not return any value.

### sdk.queryEvidence(hashId, serverAddress, credential, callback)

Query the data according to a hash ID.

The ```hashId``` is the hash value to be queried.

The ```credential``` should be an object that is returned by ```sdk.getCredential()```.

The ```serverAddress``` can be a string that returned by ```sdk.getServerAddr()```, which specify the server address. It also can be ```undefined``` (recommended), which means that the server address will be chosen by the SDK itself.

The ```callback``` should be a function, which will be called when the server has responded the ```sdk.queryEvidence``` request.
It will be called as ```callback(err, obj)```, and the format of the parameter ```obj``` is:
```typescript
{
    data: {
        sig: string,
        data: string,
        text?: string,
        type: string
    },
    from: string,
    sig: string,
    timestamp: number
}
```

The ```data.data``` is the saved file data (encoded in base64 format).

The ```data.type``` is the type of the stored data. If a message is stored, the ```data.type``` will be ```"text"```.

The ```data.text``` is the text stored along with the data.

The ```from``` is the user's public key, which can identify a user.

The ```timestamp``` is the timestamp that the user stored the evidence. Technically, it is the number of *milliseconds* that have elapsed since ```1970-01-01 00:00:00 (UTC+8)```.

This function itself does not return any value.
