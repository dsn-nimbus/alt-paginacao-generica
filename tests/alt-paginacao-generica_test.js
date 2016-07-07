"use strict";

describe('alt.paginacao-generica', function() {
  var _Paginacao;

  beforeEach(module('alt.paginacao-generica'));

  beforeEach(inject(function($injector) {
    _Paginacao = $injector.get('AltPaginacaoGenerica');
  }));

  describe('criação', function() {
    it('deve retornar uma function', function() {
      expect(typeof _Paginacao).toBe('function');
    });

    it('deve ter a página inicial setada como 1', function() {
      var _p = new _Paginacao();

      expect(_p.paginaAtual()).toBe(1);
    });

    it('deve dar erro, já que a página passada não é um número', function() {
      var _novaPagina = "999";

      expect(function() {
        new _Paginacao(_novaPagina);
      }).toThrow(new TypeError('Página deve ser um número.'));
    });

    it('deve ter a página inicial setada com o que é passado - 999', function() {
      var _novaPagina = 999;

      var _p = new _Paginacao(_novaPagina);

      expect(_p.paginaAtual()).toBe(_novaPagina);
    });

    it('deve ter a página inicial setada com o que é passado - 999.99 deve virar 999', function() {
      var _novaPagina = 999.99;
      var _novaPaginaSanitized = 999;

      var _p = new _Paginacao(_novaPagina);

      expect(_p.paginaAtual()).toBe(_novaPaginaSanitized);
    });
  });

  describe('proxima', function() {
    it('deve ter a próxima página como 2, já que a inicial é 1', function() {
      var _p = new _Paginacao();

      _p.proxima();

      expect(_p.paginaAtual()).toBe(2);
    });

    it('deve ter a próxima página como 3, já que foram adicionadas duas páginas', function() {
      var _p = new _Paginacao();

      _p.proxima();
      _p.proxima();

      expect(_p.paginaAtual()).toBe(3);
    });

    it('deve ter a próxima página como 1000, já que a página inicial é 999', function() {
      var _p = new _Paginacao(999);

      _p.proxima();

      expect(_p.paginaAtual()).toBe(1000);
    });
  });

  describe('anterior', function() {
    it('deve ter a página anterior como 1, já que a inicial é 1', function() {
      var _p = new _Paginacao();

      _p.anterior();

      expect(_p.paginaAtual()).toBe(1);
    });

    it('deve ter a página anterior como 2, já que foram adicionadas três páginas e voltadas duas', function() {
      var _p = new _Paginacao();

      _p.proxima();
      _p.proxima();
      _p.proxima();

      expect(_p.paginaAtual()).toBe(4);

      _p.anterior();
      _p.anterior();

      expect(_p.paginaAtual()).toBe(2);
    });

    it('deve ter a página anterior como 999, já que a página inicial é 1000', function() {
      var _p = new _Paginacao(1000);

      _p.anterior();

      expect(_p.paginaAtual()).toBe(999);
    });
  });

  describe('reseta', function() {
    it('deve manter a página inicial como 1', function() {
      var _p = new _Paginacao();

      _p.reseta();

      expect(_p.paginaAtual()).toBe(1);
    });

    it('deve voltar a página para 1', function() {
      var _p = new _Paginacao(1000);

      expect(_p.paginaAtual()).toBe(1000);

      _p.reseta();

      expect(_p.paginaAtual()).toBe(1);
    });
  });

  describe('pulaPara', function() {
    it('deve manter a página inicial como 1, página passada é menor que 1', function() {
      var _p = new _Paginacao();

      _p.pulaPara(0);

      expect(_p.paginaAtual()).toBe(1);
    });

    it('deve voltar a página para 1', function() {
      var _p = new _Paginacao(1000);

      expect(_p.paginaAtual()).toBe(1000);

      _p.pulaPara(1);

      expect(_p.paginaAtual()).toBe(1);
    });

    it('deve pular para a página para 1111', function() {
      var _p = new _Paginacao();

      expect(_p.paginaAtual()).toBe(1);

      _p.pulaPara(1111);

      expect(_p.paginaAtual()).toBe(1111);
    });
  });
});
