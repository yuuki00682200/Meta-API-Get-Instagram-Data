# Meta-API-Get-Instagram-Data

このプログラムは、Meta社の提供するInstagram graph APIを用いてビジネスアカウントとして登録されているInstagramアカウントから情報を取得するためのサンプルコードです。アクセストークン・ユーザーIDを取得することができれば、Google App Script環境でプログラムをコピーするだけで動作させることができます。

This program is a sample code for acquiring information from an Instagram account registered as a business account using the Instagram graph API provided by Meta. If you can obtain an access token/user ID, you can run the program by simply copying it in the Google App Script environment.


# Files

[getfollower.js](https://github.com/yuuki00682200/Meta-API-Get-Instagram-Data/blob/master/getfollower.js "getfollower.js") では、 フォロワー数を取得することができます。

[getimpression.js](https://github.com/yuuki00682200/Meta-API-Get-Instagram-Data/blob/master/getimpression.js "getimpression.js") では、フォロワー数以外でのインプレッション数などを取得することができます。

[getfollower.js](https://github.com/yuuki00682200/Meta-API-Get-Instagram-Data/blob/master/getfollower.js "getfollower.js") allows you to get the number of followers .

[getimpression.js](https://github.com/yuuki00682200/Meta-API-Get-Instagram-Data/blob/master/getimpression.js "getimpression.js") calculates the number of impressions other than the number of followers. You can get it.

## Caution
Meta社の提供するAPIはアップデートによって変更が発生する場合があり、このプログラムは恒常的に動作することを保証するものではありません。

また、v18.0といったバージョンはそれぞれのMeta Business accountで設定するもので、動作しない場合には確認してください。

The API provided by Meta may change due to updates, and this program does not guarantee constant operation.

Also, versions such as v18.0 are set in each Meta Business account, so please check if it does not work.
