import 'cypress-file-upload'
import '../support/commands'

describe('Submeter Proposta', () => {

  beforeEach(() => {
    cy.loginPorFixture('submeter-proposta')
    cy.fixture('submeter-proposta').as('fixture')
  })

  context('Edição Proposta', () => {
    // ════════════════════════════════════════════════════════════════
    // STEP 1 — CARACTERIZAÇÃO / INFORMAÇÕES INICIAIS
    // ════════════════════════════════════════════════════════════════
    beforeEach(() => {
        cy.get('@fixture').then(({ propostaValida }: any) => {
            cy.visit('https://novo-sig.homolog.ledes.net')
            cy.get('[data-cy="projetos-ver-mais"]').click()
            cy.get(':nth-child(1) > .css-k9f5ec > .css-kbi0st > .css-xb68j8 > .css-vsxyhc > :nth-child(2) > .css-ylpd68').first().click()
            cy.wait(500);
        })
    })

    context('Informações Iniciais', () => {

        context('Caminho Feliz', () => {
        it('deve preencher as Informações Iniciais e criar a proposta com sucesso', () => {})
        })

        context('Validações', () => {
        it('deve exibir erro quando Título do Projeto está vazio', () => {})
        it('deve exibir erro quando Título do Projeto excede 128 caracteres', () => {})
        it('deve exibir erro quando Duração é menor que 1', () => {})
        it('deve exibir erro quando Duração excede a duração máxima do edital', () => {})
        it('deve exibir erro quando Instituição Executora não é selecionada', () => {})
        it('deve exibir erro quando Unidade Executora não é selecionada', () => {})
        })

        context('Editar', () => {
        it('deve editar a Área de Conhecimento com sucesso', () => {})
        })

        context('Excluir', () => {
        it('deve excluir a Área de Conhecimento com sucesso', () => {})
        })
    })

    // ════════════════════════════════════════════════════════════════
    // STEP 1 — CARACTERIZAÇÃO / INFORMAÇÕES COMPLEMENTARES
    // ════════════════════════════════════════════════════════════════

    context('Informações Complementares', () => {

        beforeEach(() => {
        cy.navegarParaProposta('informacoes-complementares')
        })

        context('Caminho Feliz', () => {
        it('deve preencher as Informações Complementares com sucesso', () => {})
        })

        context('Validações', () => {
        it('deve exibir erro quando pergunta obrigatória não é respondida', () => {})
        })
    })

    // ════════════════════════════════════════════════════════════════
    // STEP 1 — CARACTERIZAÇÃO / ABRANGÊNCIA
    // ════════════════════════════════════════════════════════════════

    context('Abrangência', () => {

        beforeEach(() => {
            cy.wait(500);
            cy.get('[data-cy="abrangencia"]').click();
        
        })

        context('Caminho Feliz', () => {
            it('deve adicionar Estado e Município na Abrangência e avançar com sucesso', () => {
                cy.get('@fixture').then(({ propostaValida }: any) => {
                    cy.get('[data-cy="add-button"]').click();
                    cy.selecionarOpcao('open-estado-id', 'search-estado-id', propostaValida.caracterizacao.abrangencia.estado);
                    cy.selecionarOpcao('open-abrangencia-municipio', 'search-abrangencia-municipio', propostaValida.caracterizacao.abrangencia.municipios[0], 'close-abrangencia-municipio');
                    cy.get('[data-cy="abrangencia-confirmar"]').click();
                    cy.contains('td', propostaValida.caracterizacao.abrangencia.estado).should('be.visible');
                    cy.contains('td', propostaValida.caracterizacao.abrangencia.municipios[0]).should('be.visible');
                    cy.get('[data-cy="next-button"]').click();
                    cy.contains('Salvo com sucesso!').should('be.visible');
                })
            })

            it('deve avançar para a próxima etapa sem adicionar Abrangência', () => {
                cy.get('[data-cy="next-button"]').click();
                cy.contains('Dados do usuário atualizados com sucesso.').should('be.visible');
            })

            it('deve adicionar Abrangência informando apenas o Estado sem Município', () => {
                cy.get('@fixture').then(({ propostaValida }: any) => {
                    cy.get('[data-cy="add-button"]').click();
                    cy.selecionarOpcao('open-estado-id', 'search-estado-id', propostaValida.caracterizacao.abrangencia.estado);
                    cy.get('[data-cy="abrangencia-confirmar"]').click();
                    cy.contains('Salvo com sucesso!').should('be.visible');
                })
            })
        })

        context('Validações', () => {
            it('deve listar apenas os estados configurados no edital', () => {
                cy.get('[data-cy="add-button"]').click();
                cy.get('[data-cy="open-estado-id"]').click();
                cy.get('[role="option"]').should('have.length.greaterThan', 0);
                cy.get('[data-cy="search-estado-id"]').type('Amazonas');
                cy.get('[role="option"]').should('not.exist');
                cy.get('[data-cy="search-estado-id"]').clear().type('Mato Grosso do Sul');
                cy.get('[role="option"]').should('have.length', 1);
            });
        })

        context('Editar', () => {
            it('deve editar os Municípios de uma Abrangência já adicionada com sucesso', () => {
                cy.get('@fixture').then(({ propostaValida }: any) => {
                    cy.contains('tr', propostaValida.caracterizacao.abrangencia.estado).find('[data-cy="editar-button"]').click();
                    cy.get('[data-cy="search-abrangencia-municipio"]').should('be.visible').clear();
                    cy.selecionarOpcao('search-abrangencia-municipio', 'search-abrangencia-municipio', propostaValida.caracterizacao.abrangencia.municipios[1], 'close-abrangencia-municipio')
                    cy.get('[data-cy="abrangencia-confirmar"]').click(),
                    cy.contains('Salvo com sucesso!').should('be.visible');

                })
            })
        })

        context('Excluir', () => {
            it('deve excluir uma Abrangência já adicionada com sucesso', () => {
                cy.get('@fixture').then(({ propostaValida }: any) => {
                    cy.get('[data-cy="apagar-button"]').first().click();
                    cy.contains('Salvo com sucesso!').should('be.visible');
            })
        })
    })
})


    // ════════════════════════════════════════════════════════════════
    // STEP 2 — COORDENAÇÃO / DADOS ACADÊMICOS
    // ════════════════════════════════════════════════════════════════

    context('Dados Acadêmicos', () => {

        beforeEach(() => {
        cy.navegarParaProposta('dados-academicos')
        })

        context('Caminho Feliz', () => {
        it('deve preencher os Dados Acadêmicos com sucesso', () => {})
        })

        context('Validações', () => {
        it('deve exibir erro quando Lattes excede 1024 caracteres', () => {})
        it('deve exibir erro quando LinkedIn excede 1024 caracteres', () => {})
        it('deve exibir campos de sugestão quando checkbox Sugerir Instituição é marcado', () => {})
        it('deve exibir campos de sugestão quando checkbox Sugerir Unidade é marcado', () => {})
        })

        context('Editar', () => {
        it('deve editar a Área de Conhecimento com sucesso', () => {})
        })

        context('Excluir', () => {
        it('deve excluir a Área de Conhecimento com sucesso', () => {})
        })
    })

    // ════════════════════════════════════════════════════════════════
    // STEP 2 — COORDENAÇÃO / DADOS PROFISSIONAIS
    // ════════════════════════════════════════════════════════════════

    context('Dados Profissionais', () => {

        beforeEach(() => {
        cy.navegarParaProposta('dados-profissionais')
        })

        context('Caminho Feliz', () => {
        it('deve preencher os Dados Profissionais com sucesso', () => {})
        })

        context('Validações', () => {
        it('deve ocultar campos de vínculo empregatício quando checkbox Possui Vínculo Institucional está desmarcado', () => {})
        it('deve exibir campos de vínculo empregatício quando checkbox Possui Vínculo Institucional é marcado', () => {})
        it('deve exibir erro quando Início de Serviço possui formato inválido', () => {})
        it('deve exibir erro quando Início de Função possui formato inválido', () => {})
        })
    })

    // ════════════════════════════════════════════════════════════════
    // STEP 3 — APRESENTAÇÃO / DESCRIÇÃO
    // ════════════════════════════════════════════════════════════════

    context('Descrição', () => {

        beforeEach(() => {
        cy.navegarParaProposta('descricao')
        })

        context('Caminho Feliz', () => {
        it('deve preencher a Descrição com sucesso', () => {})
        })

        context('Validações', () => {
        it('deve exibir erro quando pergunta obrigatória não é respondida', () => {})
        })
    })

    // ════════════════════════════════════════════════════════════════
    // STEP 3 — APRESENTAÇÃO / MEMBROS
    // ════════════════════════════════════════════════════════════════

    context('Membros', () => {

        beforeEach(() => {
        cy.navegarParaProposta('membros')
        })

        context('Caminho Feliz', () => {
        it('deve adicionar Membro e exibir convite com status Pendente', () => {})
        })

        context('Excluir', () => {
        it('deve remover Membro com convite Pendente e exibir status Removido', () => {})
        it('deve reenviar convite a Membro Removido e exibir status Pendente', () => {})
        })
    })

    // ════════════════════════════════════════════════════════════════
    // STEP 3 — APRESENTAÇÃO / ATIVIDADES
    // ════════════════════════════════════════════════════════════════

    context('Atividades', () => {

        beforeEach(() => {
        cy.navegarParaProposta('atividades')
        })

        context('Caminho Feliz', () => {
        it('deve adicionar Atividade com sucesso', () => {})
        })

        context('Validações', () => {
        it('deve exibir erro quando Título da Atividade excede 32 caracteres', () => {})
        it('deve exibir erro quando Duração da Atividade excede o saldo de meses disponíveis', () => {})
        })

        context('Editar', () => {
        it('deve editar uma Atividade com sucesso', () => {})
        })

        context('Excluir', () => {
        it('deve excluir uma Atividade com sucesso', () => {})
        })
    })

    // ════════════════════════════════════════════════════════════════
    // STEP 3 — APRESENTAÇÃO / ORÇAMENTO / FAIXA DE FINANCIAMENTO
    // ════════════════════════════════════════════════════════════════

    context('Faixa de Financiamento', () => {

        beforeEach(() => {
        cy.navegarParaProposta('faixa-de-orcamento')
        })

        context('Caminho Feliz', () => {
        it('deve selecionar a Faixa de Financiamento com sucesso', () => {})
        })
    })

    // ════════════════════════════════════════════════════════════════
    // STEP 3 — APRESENTAÇÃO / ORÇAMENTO / BOLSA
    // ════════════════════════════════════════════════════════════════

    context('Bolsa', () => {

        beforeEach(() => {
        cy.navegarParaProposta('bolsa')
        })

        context('Caminho Feliz', () => {
        it('deve adicionar Bolsa com sucesso', () => {})
        })

        context('Validações', () => {
        it('deve exibir erro quando Quantidade é negativa', () => {})
        it('deve exibir erro quando Valor Total é negativo', () => {})
        it('deve exibir erro quando Duração não é selecionada', () => {})
        it('deve exibir campos de Contrapartida quando checkbox é marcado', () => {})
        })

        context('Editar', () => {
        it('deve editar uma Bolsa com sucesso', () => {})
        })

        context('Excluir', () => {
        it('deve excluir uma Bolsa com sucesso', () => {})
        })
    })

    // ════════════════════════════════════════════════════════════════
    // STEP 4 — ANEXOS / DOCUMENTOS PESSOAIS
    // ════════════════════════════════════════════════════════════════

    context('Documentos Pessoais', () => {

        beforeEach(() => {
        cy.navegarParaProposta('documentos-pessoais')
        })

        context('Caminho Feliz', () => {
        it('deve anexar Documento Pessoal com sucesso', () => {})
        })

        context('Validações', () => {
        it('deve bloquear upload de arquivo com formato não permitido', () => {})
        it('deve bloquear upload de arquivo que excede o tamanho máximo', () => {})
        })

        context('Excluir', () => {
        it('deve remover Documento Pessoal com sucesso', () => {})
        })
    })

    // ════════════════════════════════════════════════════════════════
    // STEP 4 — ANEXOS / DOCUMENTOS DA PROPOSTA
    // ════════════════════════════════════════════════════════════════

    context('Documentos da Proposta', () => {

        beforeEach(() => {
        cy.navegarParaProposta('documentos-da-proposta')
        })

        context('Caminho Feliz', () => {
        it('deve anexar Documento da Proposta com sucesso', () => {})
        })

        context('Validações', () => {
        it('deve bloquear upload de arquivo com formato não permitido', () => {})
        it('deve bloquear upload de arquivo que excede o tamanho máximo', () => {})
        })

        context('Excluir', () => {
        it('deve remover Documento da Proposta com sucesso', () => {})
        })
    })

    // ════════════════════════════════════════════════════════════════
    // STEP 5 — FINALIZAÇÃO / TERMO DE ACEITE
    // ════════════════════════════════════════════════════════════════

    context('Termo de Aceite', () => {

        beforeEach(() => {
        cy.navegarParaProposta('termo-de-aceite')
        })

        context('Caminho Feliz', () => {
        it('deve aceitar o Termo e submeter a proposta com sucesso', () => {})
        })

        context('Validações', () => {
        it('deve manter o botão Submeter desabilitado quando o Termo não foi aceito', () => {})
        it('deve desabilitar o botão Submeter ao desmarcar o Termo após aceite', () => {})
        })
    })
})
})

/*
  ══════════════════════════════════════════════════════════════
  REPORT — ELEMENTOS SEM data-cy IDENTIFICADOS
  Arquivo: submeter-proposta.cy.ts
  ══════════════════════════════════════════════════════════════

  Navegação até o edital:
  - Campo de busca de edital (tela Editais)
  - Botão "Visualizar Edital" (tela Editais)
  - Botão "Criar Proposta" (tela Detalhes do Edital)

  Seção Abrangência:
  - Botão de editar abrangência por linha da tabela
  - Botão de excluir abrangência por linha da tabela

  Seção Membros:
  - Botão "Adicionar" de Membros
  - Botão de remover Membro por linha da tabela
  - Botão de reenviar convite por linha da tabela

  Seção Atividades:
  - Campo "Responsável"
  - Campo "Membros da Atividade"

  Seção Anexos:
  - Input de upload — Documentos Pessoais da Proposta
  - Input de upload — Documentos da Proposta

  Seção Indicadores de Produção (fora do escopo atual):
  - Todos os campos de qtde nacional (Indicadores 1 a 13)
  - Todos os campos de qtde internacional (Indicadores 1 a 13)
  ══════════════════════════════════════════════════════════════
*/