;(function(ng) {
  "use strict";

  ng.module('alt.paginacao-generica', [])
    .service('AltPaginacaoGenerica', [function() {
      var Paginacao = function(pg) {
        if (ng.isDefined(pg) && !ng.isNumber(pg)) {
          throw new TypeError('Página deve ser um número.');
        }        

        this._pagina = ~~pg > 0 ? ~~pg : 1;
      };

      Paginacao.prototype.paginaAtual = function() {
        return this._pagina; 
      };

      Paginacao.prototype.proxima = function() {
        this._pagina++;
      };

      Paginacao.prototype.anterior = function() {
        return (this._pagina - 1) < 1 ? 1 : --this._pagina;  
      };

      Paginacao.prototype.reseta = function() {
        this._pagina = 1;        
      };

      Paginacao.prototype.pulaPara = function(pg) {
        this._pagina = ng.isNumber(pg) && pg >= 1 ? pg : 1; 
      };

      return Paginacao;
    }]);
}(window.angular));
