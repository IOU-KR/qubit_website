# Qubit 2025 Programming Club - Membership Application Website

2025년 큐비트 동아리 회원 모집 당시 사용한 웹 서비스입니다.

## 환경 설정

node.js와 yarn으로 구성된 프로젝트입니다.

```sh
git clone https://github.com/IOU-KR/qubit-website
```

### Nix

프로젝트에서 `nix-shell` 환경으로 들어옵니다.

```sh
cd qubit-website
nix-shell
```

`nix-shell` 환경에서 `yarn`으로 패키지를 다운로드합니다.

```sh
yarn
```

### Ubuntu

`nodejs`와 `yarn`을 설치합니다.

```sh
apt install nodejs yarn
```

프로젝트에서 `yarn`으로 패키지를 다운로드합니다.

```sh
cd qubit-website
yarn
```

---

node.js를 위한 환경 준비는 끝났습니다. 이제 웹사이트 구성을 완료해야합니다.

`.env` 파일을 생성해야합니다. `.env.example`을 프로젝트에서 복사해주세요.

```sh
cp .env.example .env
```

선호하는 에디터로 `.env`를 **수정해야합니다.**

```sh
vim .env
```

## 실행

프로젝트에서 `./run.sh`를 실행하세요.

```sh
./run.sh
```