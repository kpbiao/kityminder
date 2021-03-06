( function () {
    function getKMBasePath( docUrl, confUrl ) {

        return getBasePath( docUrl || self.document.URL || self.location.href, confUrl || getConfigFilePath() );

    }

    function getConfigFilePath() {

        var configPath = document.getElementsByTagName( 'script' );

        return configPath[ configPath.length - 1 ].src;

    }

    function getBasePath( docUrl, confUrl ) {

        var basePath = confUrl;


        if ( /^(\/|\\\\)/.test( confUrl ) ) {

            basePath = /^.+?\w(\/|\\\\)/.exec( docUrl )[ 0 ] + confUrl.replace( /^(\/|\\\\)/, '' );

        } else if ( !/^[a-z]+:/i.test( confUrl ) ) {

            docUrl = docUrl.split( "#" )[ 0 ].split( "?" )[ 0 ].replace( /[^\\\/]+$/, '' );

            basePath = docUrl + "" + confUrl;

        }

        return optimizationPath( basePath );

    }

    function optimizationPath( path ) {

        var protocol = /^[a-z]+:\/\//.exec( path )[ 0 ],
            tmp = null,
            res = [];

        path = path.replace( protocol, "" ).split( "?" )[ 0 ].split( "#" )[ 0 ];

        path = path.replace( /\\/g, '/' ).split( /\// );

        path[ path.length - 1 ] = "";

        while ( path.length ) {

            if ( ( tmp = path.shift() ) === ".." ) {
                res.pop();
            } else if ( tmp !== "." ) {
                res.push( tmp );
            }

        }

        return protocol + res.join( "/" );

    }
    window.KITYMINDER_CONFIG = {
        'KITYMINDER_HOME_URL': getKMBasePath(),
        //定义工具栏
        toolbars: [
            'hand zoom-in zoom-out | undo redo | bold italic | fontfamily fontsize forecolor | saveto | markers | node | switchlayout | help'
        ]

        //设置主题
        //,defaultlayoutstyle : 'default' //设置默认的主题
        //,layoutstyle : []   //添加有那些主图

        //回退相关选项
        //,maxUndoCount:20  //最大可回退的次数，默认20

        //语言默认是zh-cn
        //,lang:'zh-cn'

        //设置km整体的z-index大小
        //,zIndex : 1000
    };
} )()