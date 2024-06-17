<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #F9F9F9;
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: #FFFFFF;
            padding: 20px;
            margin: 20px auto;
            max-width: 600px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .logo {
            max-width: 100px;
            margin: 0 auto 20px;
        }
        h1 {
            font-family: "Aventa-Bold", sans-serif;
            color: #13332C;
            font-size: 35px;
            letter-spacing: -1.31px;
            line-height: 0.9em;
            margin-bottom: 20px;
        }
        p {
            color: #3B3C45;
            line-height: 24px;
            margin-bottom: 20px;
        }
        .signature {
            margin-top: 40px;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://framerusercontent.com/images/f0btmN2GtVDhwuoOUM5xAjorM.png?scale-down-to=512" alt="Logo" class="logo">
        <h1>Olá, <strong>{{ $name }}</strong></h1>
        <p>Esse é um email de cobrança</p>
        <p class="signature">Obrigado,<br>Time Kanastra</p>
    </div>
</body>
</html>
