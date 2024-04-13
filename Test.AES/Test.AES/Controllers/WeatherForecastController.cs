using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;

namespace Test.AES.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DemoAesController : ControllerBase
    {
        [HttpPost("/DecryptionData")]
        public object DecryptionData([FromBody] Dictionary<string, string> requestData)
        {
            var cipherText = Convert.FromBase64String(requestData["Data"]);
            var iv = Convert.FromBase64String(requestData["Iv"]);
            var key = Convert.FromBase64String(requestData["Key"]);

            return DecryptPayload(cipherText, iv, key);
        }

        [HttpGet("/GetIvAndSecret")]
        public object CreateIvAndKey()
        {
            using (Aes myAes = Aes.Create())
            {
                return new
                {
                    IV = Convert.ToBase64String(myAes.IV),
                    Key = Convert.ToBase64String(myAes.Key)
                };
            }
        }

        private string DecryptPayload(byte[] cipherText, byte[] IV, byte[] Key)
        {
            if (cipherText == null || cipherText.Length <= 0)
                throw new ArgumentNullException("cipherText");

            string plaintext = null;

            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = Key;
                aesAlg.IV = IV;

                // Create a decryptor to perform the stream transform.
                ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

                // Create the streams used for decryption.
                using (MemoryStream msDecrypt = new MemoryStream(cipherText))
                {
                    using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                        {

                            // Read the decrypted bytes from the decrypting stream
                            // and place them in a string.
                            plaintext = srDecrypt.ReadToEnd();
                        }
                    }
                }
            }


            return plaintext;
        }
    }
}