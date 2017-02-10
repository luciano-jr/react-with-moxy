export default function({ config, assets }) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta http-equiv="x-ua-compatible" content="ie=edge">

                <!-- Roboto from Google-->
                <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" rel="stylesheet">

                <!-- App stylesheet -->
                <link id="app-css" rel="stylesheet" href="${assets['app.css']}">
            </head>
            <body>
                <!-- Root element where app goes -->
                <div id="root"></div>

                <!-- Load main file -->
                <script src="${assets['main.js']}"></script>

                ${ assets['deferrable.js'] ? `
                    <!-- Load deferrable file -->
                    <script src="${assets['deferrable.js']}" async defer></script>
                 ` ? '' }

                ${config.googleTrackingId ? `
                    <!-- Google Tag Manager -->
                    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${config.googleTrackingId}');</script>
                    <!-- End Google Tag Manager -->
                ` : ''}
            </body>
        </html>
    `;
}
