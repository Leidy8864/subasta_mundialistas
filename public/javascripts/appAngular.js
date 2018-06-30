angular.module('appSubastas', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
    
        $stateProvider
            .state('inicio', {
                url: '/inicio',
                templateUrl: 'views/index.html',
                controller: 'ctrlRealizar'
            })
            .state('realizar', {
                url: '/realizar',
                templateUrl: 'views/realizar.ejs',
                controller: 'ctrlRealizar'
            })
            .state('productos', {
                url: '/productos',
                templateUrl: 'views/productos.html',
                controller: 'ctrlRealizar'
            })
            .state('detalles', {
                url: '/detalles',
                templateUrl: 'views/detalles.html',
                controller:  'ctrlDetalles' 
            })
            .state('mis_pro', {
                url: '/mis_pro',
                templateUrl: 'views/cart.html',
                controller: 'ctrlRealizar'
            })
            .state('mis_pro_pujas', {
                url: '/mis_pro_pujas',
                templateUrl: 'views/cart-pujas.html',
                controller: 'ctrlDetalles'
            })
            .state('editar', {
                url: '/mis_pro',
                templateUrl: 'views/editar.html',
                controller: 'ctrlEditar'
            })
            .state('boleta', {
                url: '/boleta',
                templateUrl: 'views/boleta.html',
                controller: 'ctrlBoletas'
            })
            .state('notificacion', {
                url: '/notificacion',
                templateUrl: 'views/boleta_notif.html',
                controller: 'ctrlBoletas'
            });

        $urlRouterProvider.otherwise('inicio');
    })
    .controller('ctrlRealizar', function($scope, $state, comun, inf, $http) {
        $scope.subasta = {}

        comun.getAll();

        $scope.subastas = comun.subastas;
    
        $scope.agregar = function(){
             var formData = new FormData;
              
              for(key in $scope.subasta){
                  console.log(key, 'key...');
                  console.log($scope.subasta[key]);
                  
                  formData.append(key, $scope.subasta[key]);
              }
              
              //trayendo el archivo
              var file = $('#file')[0].files[0];
              console.log(file, "file...");
              formData.append('image', file);
              
              //posteanto la imagen
              $http.post('/s/subasta', formData,{
                  transformRequest: angular.identity,
                  headers: {
                      'Content-Type': undefined
                  }
              }).then(function (res){
                  $scope.item = res.data;
              });
            $state.go('productos');
        }

        $scope.eliminar = function(subasta) {
            comun.delete(subasta);
        }

        $scope.procesaObjeto = function(subasta) {
            comun.subasta = subasta;
            $state.go('detalles');
        }
        
        $scope.procesaSubasta = function(subasta) {
            comun.subasta = subasta;
            $state.go('editar');
        }
        
        $scope.procesaPuja = function(subasta) {
            comun.subasta = subasta;
            $state.go('mis_pro_pujas');
        }
        
        $scope.user  = {}
        inf.getAll();
        $scope.users = inf.users; 

    })
    .controller('ctrlDetalles', function($scope, $state, comun, inf) {
        $scope.subasta = {}

        comun.getAll();

        $scope.subastas = comun.subastas;
    
        $scope.subasta  = comun.subasta;
    
        $scope.procesaObjeto = function(subasta) {
            comun.subasta = subasta;
            $state.go('detalles');
        }
        
        $scope.user  = {}
        inf.getAll();
        $scope.users = inf.users; 
        
    })
    .controller('ctrlEditar', function($scope, $state, comun) {
    
        $scope.subasta  = comun.subasta;
        
        $scope.actualizar = function() {
            comun.update($scope.subasta);
            $state.go('mis_pro');
        }

        $scope.eliminar = function(){
            comun.delete($scope.subasta);
            $state.go('mis_pro');
        }
    })
    .controller('ctrlPujas', function($scope, $state, comunn) {
        $scope.puja = {}
    
        comunn.getAll();
    
        $scope.pujas     = comunn.pujas;      
        
        $scope.agregar = function() {
            comunn.add({
                usuario_id      : $scope.puja.usuario_id,
                subasta_id      : $scope.puja.subasta_id,
                precio_puja     : parseFloat($scope.puja.precio_puja)
        })
            $scope.puja.subasta_id    = '';
            $scope.puja.precio_puja   = '';
        }
                
        $scope.eliminar = function(puja) {
            comunn.delete(puja);
        }

        $scope.procesaObjeto = function(puja) {
            comunn.puja = puja;
            $state.go('detalles');
        }
        
        $scope.procesaPuja = function(puja) {
            comunn.puja = puja;
            $state.go('boleta');
        }
        
    })
    .controller('ctrlBoletas', function($scope, $state, kai, comunn, comun) {
        
        $scope.subasta = {}
        comun.getAll();
        $scope.subastas = comun.subastas;
    
        $scope.puja = {}
        comunn.getAll();
        $scope.pujas     = comunn.pujas;   
        $scope.puja  = comunn.puja;
    
        $scope.boleta = {}
        kai.getAll();
        $scope.boletas     = kai.boletas;      
        
        $scope.agregar = function() {
            kai.add({
                u_vendedor_id      : $scope.boleta.u_vendedor_id,
                u_comprador_id     : $scope.boleta.u_comprador_id,
                subasta_id         : $scope.boleta.subasta_id,
                puja_id            : $scope.boleta.puja_id
        })
            $scope.boleta.u_vendedor_id    = '';
            $scope.boleta.u_comprador_id   = '';
            $scope.boleta.subasta_id       = '';
            $scope.boleta.puja_id          = '';
        }
                
        $scope.eliminar = function(boleta) {
            kai.delete(boleta);
        }

        $scope.procesaObjeto = function(boleta) {
            kai.boleta = boleta;
            $state.go('detalles');
        }
        
    })
    .controller('ctrlUsers', function($scope, $state, inf) {
        $scope.user  = {}
        inf.getAll();
        $scope.users = inf.users;      
    })

/////////////**************//////////*********//////////////*/////////*****///////////
angular.module('appSubastas')
    .factory('inf', function($http) {
        var inf = {};

        inf.users  = [];
        inf.user   = {};

        /***Sección de métodos remotos***/
        inf.getAll = function(){
            return $http.get('/users')
            .success(function(data){
                angular.copy(data, inf.users)
                return inf.users
            })
        }
        return inf;
    })
    .factory('comun', function($http) {
        var comun = {};

        comun.subastas  = [];
        comun.subasta   = {};

        /***Sección de métodos remotos***/
        comun.getAll = function(){
            return $http.get('/s/subastas')
            .success(function(data){
                angular.copy(data, comun.subastas)

                return comun.subastas
            })
        }

        comun.add = function(subasta){
            return $http.post('/s/subasta', subasta)
            .success(function(subasta){
                comun.subastas.push(subasta);
            })
        }

        comun.update = function(subasta){
            return $http.put('/s/subasta/' + subasta._id, subasta)
            .success(function(data){
                var indice = comun.subastas.indexOf(subasta);
                comun.subastas[indice] = data;
            })
        }

        comun.delete = function(subasta){
            return $http.delete('/s/subasta/' + subasta._id)
            .success(function(){
                var indice = comun.subastas.indexOf(subasta);
                comun.subastas.splice(indice, 1);
            })
        }
        return comun;
    })
    .factory('comunn', function($http) {
        var comunn = {};

        comunn.pujas     = [];
        comunn.puja      = {};

        /***Sección de métodos remotos***/
        comunn.getAll = function(){
            return $http.get('/p/pujas')
            .success(function(data){
                angular.copy(data, comunn.pujas)

                return comunn.subastas
            })
        }

        comunn.add = function(puja){
            return $http.post('/p/puja', puja)
            .success(function(puja){
                comunn.pujas.push(puja);
            })
        }

        comunn.update = function(puja){
            return $http.put('/p/puja/' + puja._id, puja)
            .success(function(data){
                var indice = comunn.pujas.indexOf(puja);
                comunn.pujas[indice] = data;
            })
        }

        comunn.delete = function(puja){
            return $http.delete('/p/puja/' + puja._id)
            .success(function(){
                var indice = comunn.pujas.indexOf(puja);
                comunn.pujas.splice(indice, 1);
            })
        }
        return comunn;
    })
    .factory('comen', function($http) {
        var comen = {};

        comen.comentarios     = [];
        comen.comentario      = {};

        /***Sección de métodos remotos***/
        comen.getAll = function(){
            return $http.get('/c/comentarios')
            .success(function(data){
                angular.copy(data, comen.comentarios)
                return comen.comentarios
            })
        }

        comen.add = function(comentario){
            return $http.post('/c/comentario', comentario)
            .success(function(puja){
                comen.comentarios.push(comentario);
            })
        }

        comen.update = function(comentario){
            return $http.put('/c/comentario/' + comentario._id, comentario)
            .success(function(data){
                var indice = comen.comentarios.indexOf(comentario);
                comen.comentarios[indice] = data;
            })
        }

        comen.delete = function(comentario){
            return $http.delete('/c/comentario/' + comentario._id)
            .success(function(){
                var indice = comen.comentarios.indexOf(comentario);
                comen.comentarios.splice(indice, 1);
            })
        }
        return comen;
    })
    .factory('kai', function($http) {
        var kai = {};

        kai.boletas     = [];
        kai.boleta      = {};

        /***Sección de métodos remotos***/
        kai.getAll = function(){
            return $http.get('/b/boletas')
            .success(function(data){
                angular.copy(data, kai.boletas)
                return kai.boletas
            })
        }

        kai.add = function(boleta){
            return $http.post('/b/boleta', boleta)
            .success(function(puja){
                kai.boletas.push(boleta);
            })
        }

        kai.update = function(boleta){
            return $http.put('/b/boleta/' + boleta._id, boleta)
            .success(function(data){
                var indice = kai.boletas.indexOf(boleta);
                kai.boletas[indice] = data;
            })
        }

        kai.delete = function(boleta){
            return $http.delete('/b/boleta/' + boleta._id)
            .success(function(){
                var indice = kai.boletas.indexOf(boleta);
                kai.boletas.splice(indice, 1);
            })
        }
        return kai;
    })
   
