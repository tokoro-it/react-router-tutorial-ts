# React Router のチュートリアルをTypeScriptやってみた

[TSチュートリアル1]: https://qiita.com/FumioNonaka/items/ffa6fbd25fe3d7a40088
[TSチュートリアル2]: https://qiita.com/FumioNonaka/items/5027da3d6748eac7f060


## 経緯

React Routerの勉強のために、チュートリアルをやってみた。

[React Router公式](https://reactrouter.com/en/main/start/tutorial)
まず公式は、JavaScriptだが、TypeScriptで書いてみたものの、いろいろ理解が浅く適切に型を定義できず、VSCodeでエラーがでている。

ググったところ、よさげなQiitaの記事が見つかった。  
同じ読みながらやってみて、だいぶ理解が進んだものの、一部省略していたので、もう少しちゃんと型を定義して書いてみた
* [React + React Router + TypeScript: チュートリアル[01]][TSチュートリアル1]
* [React + React Router + TypeScript: チュートリアル[02]][TSチュートリアル2]

## 前提

Qiitaのチュートリアルのほうには、StackBlitzでサンプルコード用意されていた。  
今回は、チュートリアルの実装が一通り完了している [サンプルコード07](https://stackblitz.com/edit/stackblitz-starters-ycxk9t?file=src%2FApp.tsx) をベースにする。

* React Routerに関係ない警告やエラーは、今回は関係ないので、無視
* 実務は考慮していないので、コードの分割は基本的にはしない

## 流れ

mainブランチのログを見ればわかると思うが、主に以下の流れで作業した

* ViteでReact TypeScriptでプロジェクト作成
* 必要な追加ライブラリをインストール
* サンプルコード07からコードを移植とファイルの整理
* 一旦動くように修正
* 型を書き直していく





