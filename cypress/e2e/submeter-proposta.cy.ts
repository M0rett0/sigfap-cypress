import 'cypress-file-upload'
import '../support/commands'

describe('Submeter Proposta', () => {

    beforeEach(() => {
        cy.loginPorFixture('submeter-proposta')
        cy.fixture('submeter-proposta').as('fixture')
    })

    context('Edição Proposta', () => {

        beforeEach(() => {
            cy.get('@fixture').then(({ propostaValida }: any) => {
                cy.visit('https://novo-sig.homolog.ledes.net')
                cy.get('[data-cy="projetos-ver-mais"]').click()
                cy.get(':nth-child(1) > .css-k9f5ec > .css-kbi0st > .css-xb68j8 > .css-vsxyhc > :nth-child(2) > .css-ylpd68').first().click()
                cy.wait(500);
            })
        })

        // ════════════════════════════════════════════════════════════════
        // STEP 1 — CARACTERIZAÇÃO / INFORMAÇÕES INICIAIS
        // ════════════════════════════════════════════════════════════════

        context('Informações Iniciais', () => {
            beforeEach(() => {
                cy.wait(500);
            
            })

            context('Caminho Feliz', () => {
                it('deve preencher as Informações Iniciais com dados válidos e avançar com sucesso', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {  
                        cy.get('[data-cy="edital.nome"]').should('be.visible').should('be.disabled')  
                        cy.get('[data-cy="titulo"]').clear().type(propostaValida.caracterizacao.informacoesIniciais.tituloProjeto)  
                        cy.get('[data-cy="open-tipo-evento-id"]').click()
                        cy.get('[data-cy="search-tipo-evento-id"]').clear().type(propostaValida.caracterizacao.informacoesIniciais.tipoEvento)
                        cy.contains('[role="option"]', propostaValida.caracterizacao.informacoesIniciais.tipoEvento).first().click()
                        cy.get('[data-cy="open-estado-execucao-evento"]').click()
                        cy.get('[data-cy="search-estado-execucao-evento"]').clear().type(propostaValida.caracterizacao.informacoesIniciais.estadoExecucao)
                        cy.contains('[role="option"]', propostaValida.caracterizacao.informacoesIniciais.estadoExecucao).first().click()
                        cy.get('[data-cy="open-municipio-execucao-evento"]').click()
                        cy.get('[data-cy="search-municipio-execucao-evento"]').clear().type(propostaValida.caracterizacao.informacoesIniciais.municipioExecucao)
                        cy.contains('[role="option"]', propostaValida.caracterizacao.informacoesIniciais.municipioExecucao).first().click()
                        cy.get('[data-cy="duracao"]').clear().type(propostaValida.caracterizacao.informacoesIniciais.duracaoMeses)
                        cy.get('[data-cy="open-instituicao-executora-id"]').click()
                        cy.get('[data-cy="search-instituicao-executora-id"]').clear().type(propostaValida.caracterizacao.informacoesIniciais.instituicaoExecutora)
                        cy.contains('[role="option"]', propostaValida.caracterizacao.informacoesIniciais.instituicaoExecutora).first().click()
                        cy.get('[data-cy="open-unidade-executora-id"]').click()
                        cy.get('[data-cy="search-unidade-executora-id"]').clear().type(propostaValida.caracterizacao.informacoesIniciais.unidadeExecutora)
                        cy.contains('[role="option"]', propostaValida.caracterizacao.informacoesIniciais.unidadeExecutora).first().click()
                        cy.get('[data-cy="add-areas-de-conhecimento"]').click()
                        cy.get('[data-cy="open-grande-area-id"]').click()
                        cy.get('[data-cy="search-grande-area-id"]').clear().type(propostaValida.caracterizacao.informacoesIniciais.areaDeConhecimento.grandeArea)
                        cy.contains('[role="option"]', propostaValida.caracterizacao.informacoesIniciais.areaDeConhecimento.grandeArea).first().click()
                        cy.get('[data-cy="areaDeConhecimento-confirmar"]').click()
                        cy.get('[data-cy="apagar-button"]').should('be.visible')
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Sucesso/i).should('be.visible');

                    })
                })
            })

            context('Validações', () => {
            
                it('deve exibir erro quando Título do Projeto está em branco', () => {
                    cy.get('[data-cy="titulo"]').clear();  
                    cy.get('[data-cy="next-button"]').click();
                    cy.contains(/Mínimo de 5 caracteres/i).should('be.visible');
                })
            
                it('deve exibir erro quando Tipo de Evento não é selecionado', () => {
                    cy.get('[data-cy="tipo-evento-id"] > .css-1xjtwhn > .css-dw0r4c').click();
                    cy.get('[data-cy="menu-verificar-pendencias"]').click();
                    cy.get('[data-cy="informacoes-iniciais"]').click({ force: true });
                    cy.contains(/O Tipo de Evento é obrigatório./i).should('be.visible');
                })
            
                it('deve exibir erro quando Município de Execução não é selecionado', () => {
                    cy.get('[data-cy="municipio-execucao-evento"] > .css-1xjtwhn > .css-dw0r4c').click();
                    cy.get('[data-cy="menu-verificar-pendencias"]').click();
                    cy.get('[data-cy="informacoes-iniciais"]').click({ force: true });
                    cy.contains(/O Município de Execução do Evento é obrigatório/i).should('be.visible');
                })
            
                it('deve exibir erro quando Estado de Execução não é selecionado', () => {
                    cy.get('[data-cy="estado-execucao-evento"] > .css-1xjtwhn > .css-dw0r4c').click();
                    cy.get('[data-cy="menu-verificar-pendencias"]').click();
                    cy.get('[data-cy="informacoes-iniciais"]').click({ force: true });
                    cy.contains(/O Estado de Execução do Evento é obrigatório/i).should('be.visible');
                })
            
                it('deve exibir erro quando Duração não é preenchida', () => {
                    cy.get('[data-cy="duracao"]').clear();
                    cy.get('[data-cy="menu-verificar-pendencias"]').click();
                    cy.get('[data-cy="informacoes-iniciais"]').click({ force: true });
                    cy.contains(/A Duração do projeto em meses é obrigatória/i).should('be.visible');
                
                })

                it('deve limitar o Título do Projeto a 128 caracteres', () => {
                    cy.get('@fixture').then(({ propostaInvalida }: any) => {
                        cy.get('[data-cy="titulo"]').clear().type(propostaInvalida.caracterizacao.informacoesIniciais.tituloProjeto_acima128chars)
                        cy.get('[data-cy="titulo"]').invoke('val').then((val) => {
                            expect((val as string).length).to.be.lte(128)
                            })
                    })
                })

                it('deve exibir erro quando Duração é menor que 1', () => {
                    cy.get('@fixture').then(({ propostaInvalida }: any) => {
                        cy.get('[data-cy="duracao"]').type(propostaInvalida.caracterizacao.informacoesIniciais.duracaoMeses_abaixoMinimo)
                        cy.get('[data-cy="menu-verificar-pendencias"]').click()
                        cy.get('[data-cy="informacoes-iniciais"]').click({ force: true })
                        cy.contains(/Erro/i).should('be.visible');
                    })
                })
            
                it('deve exibir erro quando Instituição Executora não é selecionada', () => {
                    cy.get('[data-cy="instituicao-executora-id"] > .css-1xjtwhn > .css-dw0r4c').click();
                    cy.get('[data-cy="caracterizacao"]').click();
                    cy.get('[data-cy="menu-verificar-pendencias"]').click();
                    cy.wait(500);
                    cy.get('[data-cy="informacoes-iniciais"]').click({ force: true });
                    cy.contains(/Instituição executora é obrigatória, Dados de instituicao não encontrados./i).should('be.visible');
                
                })
            
                it('deve exibir erro quando Unidade Executora não é selecionada', () => {
                    cy.get('[data-cy="unidade-executora-id"] > .css-1xjtwhn > .css-dw0r4c').click();
                    cy.get('[data-cy="menu-verificar-pendencias"]').click();
                    cy.wait(500);
                    cy.get('[data-cy="caracterizacao"]').click();
                    cy.get('[data-cy="informacoes-iniciais"]').click({ force: true });
                    cy.contains(/Unidade executora é obrigatória, Dados de instituicao não encontrados./i).should('be.visible');
                
                })
            
                it('deve atualizar a lista de Unidades Executoras ao trocar a Instituição Executora', () => {
                    cy.get('[data-cy="open-instituicao-executora-id"]').click()
                    cy.get('[data-cy="search-instituicao-executora-id"]').clear().type('UFMS')
                    cy.contains('[role="option"]', 'UFMS').first().click()
                    cy.get('[data-cy="open-unidade-executora-id"]').click()
                    cy.get('[data-cy="search-unidade-executora-id"]').clear().type('FACOM')
                    cy.contains('[role="option"]', 'FACOM').first().click()
                    cy.get('[data-cy="open-instituicao-executora-id"]').click()
                    cy.get('[data-cy="search-instituicao-executora-id"]').clear().type('UFGD')
                    cy.contains('[role="option"]', 'UFGD').first().click()
                    cy.get('[data-cy="open-unidade-executora-id"]').click()
                    cy.contains('[role="option"]', 'FACOM').should('not.exist')
                })

                context('Área de Conhecimento — Exibição Progressiva', () => {
            
                    beforeEach(() => {
                        cy.get('[data-cy="add-areas-de-conhecimento"]').click()
                    })
                
                    it('deve exibir o campo Área somente após a seleção de uma Grande Área', () => {
                        cy.get('@fixture').then(({ propostaValida }: any) => {
                            cy.get('[data-cy="search-area-id"]').should('not.exist')
                            cy.get('[data-cy="open-grande-area-id"]').click()
                            cy.get('[data-cy="search-grande-area-id"]').clear().type(propostaValida.caracterizacao.informacoesIniciais.areaDeConhecimento.grandeArea)
                            cy.contains('[role="option"]', propostaValida.caracterizacao.informacoesIniciais.areaDeConhecimento.grandeArea).first().click()
                            cy.get('[data-cy="search-area-id"]').should('be.visible')
                        })
                    })

                    it('deve exibir o campo Subárea somente após a seleção de uma Área', () => {
                        cy.get('@fixture').then(({ propostaValida }: any) => {
                            cy.get('[data-cy="open-grande-area-id"]').click()
                            cy.get('[data-cy="search-grande-area-id"]').clear().type(propostaValida.caracterizacao.informacoesIniciais.areaDeConhecimento.grandeArea)
                            cy.contains('[role="option"]', propostaValida.caracterizacao.informacoesIniciais.areaDeConhecimento.grandeArea).first().click()
                            cy.get('[data-cy="search-sub-area-id"]').should('not.exist')
                            cy.get('[data-cy="open-area-id"]').click()
                            cy.get('[data-cy="search-area-id"]').clear().type(propostaValida.caracterizacao.informacoesIniciais.areaDeConhecimento.area)
                            cy.contains('[role="option"]', propostaValida.caracterizacao.informacoesIniciais.areaDeConhecimento.area).first().click()
                            cy.get('[data-cy="search-sub-area-id"]').should('be.visible')
                        })
                    })

                    it('deve exibir o campo Especialidade somente após a seleção de uma Subárea', () => {
                        cy.get('@fixture').then(({ propostaValida }: any) => {
                            cy.get('[data-cy="open-grande-area-id"]').click()
                            cy.get('[data-cy="search-grande-area-id"]').clear().type(propostaValida.caracterizacao.informacoesIniciais.areaDeConhecimento.grandeArea)
                            cy.contains('[role="option"]', propostaValida.caracterizacao.informacoesIniciais.areaDeConhecimento.grandeArea).first().click()
                            cy.get('[data-cy="open-area-id"]').click()
                            cy.get('[data-cy="search-area-id"]').clear().type(propostaValida.caracterizacao.informacoesIniciais.areaDeConhecimento.area)
                            cy.contains('[role="option"]', propostaValida.caracterizacao.informacoesIniciais.areaDeConhecimento.area).first().click()
                            cy.get('[data-cy="search-especialidade-id"]').should('not.exist')
                            cy.get('[data-cy="open-sub-area-id"]').click()
                            cy.get('[data-cy="search-sub-area-id"]').clear().type(propostaValida.caracterizacao.informacoesIniciais.areaDeConhecimento.subArea)
                            cy.contains('[role="option"]', propostaValida.caracterizacao.informacoesIniciais.areaDeConhecimento.subArea).first().click()
                            cy.get('[data-cy="search-especialidade-id"]').should('be.visible')
                        })
                    })
                })
            
            })

        })


        // ════════════════════════════════════════════════════════════════
        // STEP 1 — CARACTERIZAÇÃO / INFORMAÇÕES COMPLEMENTARES
        // ════════════════════════════════════════════════════════════════

        context('Informações Complementares', () => {

            beforeEach(() => {
                cy.wait(500);
                cy.get('[data-cy="informacoes-complementares"]').click();
            
            })

            context('Caminho Feliz', () => {
                it('deve preencher as Informações Complementares e avançar com sucesso', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-218-item-grande-faturamento-ano-acima-de"]').first().click()
                        cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-219"]').type(propostaValida.caracterizacao.informacoesComplementares.pergunta219)
                        cy.get('[data-cy="next-button"]').click()
                    })
                })
            })

            context('Validações', () => {
                it('deve preencher as Informações Complementares e avançar com sucesso', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-218-item-grande-faturamento-ano-acima-de"]').first().click()
                        cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-219"]').type(propostaValida.caracterizacao.informacoesComplementares.pergunta219)
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Pergunta Edital/i).should('be.visible');
                    })
                })
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
        // STEP 2 — COORDENAÇÃO / DADOS PESSOAIS
        // ════════════════════════════════════════════════════════════════

        context('Dados Pessoais', () => {

            beforeEach(() => {
                cy.wait(500);
                cy.get('[data-cy="coordenacao"]').click();
                cy.get('[data-cy="dados-pessoais"]').click();
            
            })

            context('Caminho Feliz', () => {
                it('deve preencher os Dados Pessoais e avançar para Endereço com sucesso', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                    cy.get('[data-cy="criadoPor.email"]').should('have.value', propostaValida.coordenacao.dadosPessoais.emailBloqueado).and('be.disabled');
                    cy.get('[data-cy="criadoPor.documento"]').should('have.value', propostaValida.coordenacao.dadosPessoais.cpfBloqueado).and('be.disabled');
                    cy.get('[data-cy="criadoPor.nome"]').clear().type(propostaValida.coordenacao.dadosPessoais.nome);
                    cy.selecionarOpcao('open-pais-id', 'search-pais-id', propostaValida.coordenacao.dadosPessoais.pais);
                    cy.get('[data-cy="criadoPor.dataNascimento"]').type(propostaValida.coordenacao.dadosPessoais.dataNascimento, { force: true });
                    cy.get('[data-cy="next-button"]').click();
                    cy.contains('Dados do usuário atualizados com sucesso.').should('be.visible');
                    });
                });
            });

            context('Validações', () => {
                it('deve exibir erro quando Nome, Data de Nascimento e País estão em branco', () => {
                    cy.get('[data-cy="criadoPor.nome"]').clear();
                    cy.get('[data-cy="criadoPor.dataNascimento"]').type('{selectall}{backspace}', { force: true })
                    cy.get('[data-cy="open-pais-id"]').click();
                    cy.get('[data-cy="search-pais-id"]').clear();
                    cy.get('[data-cy="next-button"]').click();
                    cy.contains(/Erro/i).should('be.visible');

                })

                it('deve exibir erro quando Nome está vazio e os demais campos preenchidos', () => {
                    cy.get('[data-cy="criadoPor.nome"]').clear();
                    cy.get('[data-cy="next-button"]').click();
                    cy.contains(/Erro/i).should('be.visible');

                })
            
                it('deve exibir erro quando Data de Nascimento está vazia e os demais campos preenchidos', () => {
                    cy.get('[data-cy="criadoPor.dataNascimento"]').type('{selectall}{backspace}', { force: true });
                    cy.get('[data-cy="next-button"]').click();
                    cy.contains(/Erro/i).should('be.visible');
                })
    
                it('deve exibir erro quando País não é selecionado e os demais campos preenchidos', () => {
                    cy.get('[data-cy="open-pais-id"]').click();
                    cy.get('[data-cy="search-pais-id"]').clear();
                    cy.get('[data-cy="next-button"]').click();
                    cy.contains(/Erro/i).should('be.visible');
                })
        
                it('deve truncar o campo Nome no limite máximo de 64 caracteres', () => {
                    cy.get('@fixture').then(({ propostaInvalida }: any) => {
                        cy.get('[data-cy="possuo-nome-social-box"]').click();
                        cy.get('[data-cy="criadoPor.nome"]').clear().type(propostaInvalida.coordenacao.dadosPessoais.nome_64chars);
                        cy.get('[data-cy="criadoPor.nome"]').invoke('val').should('have.length', 64);
                        cy.get('[data-cy="criadoPor.nome"]').clear().type(propostaInvalida.coordenacao.dadosPessoais.nome_65chars);
                        cy.get('[data-cy="criadoPor.nome"]').invoke('val').should('have.length', 64);
                    })
                })
        
                it('deve truncar o campo Nome Social no limite máximo de 64 caracteres', () => {
                    cy.get('@fixture').then(({ propostaInvalida }: any) => {
                        cy.get('[data-cy="possuo-nome-social-box"]').click();
                        cy.get('[data-cy="criadoPor.nomeSocial"]').type(propostaInvalida.coordenacao.dadosPessoais.nomeSocial_64chars);
                        cy.get('[data-cy="criadoPor.nomeSocial"]').invoke('val').should('have.length', 64);
                        cy.get('[data-cy="criadoPor.nomeSocial"]').clear().type(propostaInvalida.coordenacao.dadosPessoais.nomeSocial_65chars);
                        cy.get('[data-cy="criadoPor.nomeSocial"]').invoke('val').should('have.length', 64);
                    })
                })
            
                it('deve aplicar máscara DD/MM/AAAA e rejeitar entrada inválida em Data de Nascimento', () => {
                    cy.get('@fixture').then(({ propostaInvalida }: any) => {
                        cy.get('[data-cy="criadoPor.dataNascimento"]').type('{selectall}{backspace}', { force: true });
                        cy.get('[data-cy="criadoPor.dataNascimento"]').type('19122003', { force: true });
                        cy.get('[data-cy="criadoPor.dataNascimento"]').should('have.value', '19/12/2003');

                        cy.get('[data-cy="criadoPor.dataNascimento"]').type('{selectall}{backspace}', { force: true });
                        cy.get('[data-cy="criadoPor.dataNascimento"]').type('abc', { force: true });
                        cy.get('[data-cy="criadoPor.dataNascimento"]').invoke('val').should('not.match', /[a-zA-Z]/);

                        cy.get('[data-cy="criadoPor.dataNascimento"]').type('{selectall}{backspace}', { force: true });
                        cy.get('[data-cy="criadoPor.dataNascimento"]').type(propostaInvalida.coordenacao.dadosPessoais.dataNascimento_formatoInvalido, { force: true });
                        cy.get('[data-cy="next-button"]').click();
                        cy.contains(/Erro/i).should('be.visible');
                    })
                })
            
                it('deve listar exatamente as cinco opções esperadas no seletor Raça/Cor', () => {
                    const opcoesEsperadas = ['Branco(a)', 'Pardo(a)', 'Preto(a)', 'Amarelo(a)', 'Indígena']
                    cy.get('[data-cy="open-raca-cor-id"]').click();
                    opcoesEsperadas.forEach((opcao: string) => {
                        cy.contains('[role="option"]', opcao).should('be.visible');
                    });
                });
            
                it('deve listar países pesquisáveis no seletor País', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.get('[data-cy="open-pais-id"]').click();
                        cy.get('[data-cy="search-pais-id"]').clear().type(propostaValida.coordenacao.dadosPessoais.pais);
                        cy.contains('[role="option"]', propostaValida.coordenacao.dadosPessoais.pais).should('be.visible');
                        cy.get('[data-cy="search-pais-id"]').clear().type('Alemanha');
                        cy.contains('[role="option"]', 'Alemanha').should('be.visible');
                        cy.get('[data-cy="search-pais-id"]').clear().type('Japão');
                        cy.contains('[role="option"]', 'Japão').should('be.visible');
                    });
                });

                it('deve exibir Brasil no topo da lista do seletor País', () => {
                    cy.get('[data-cy="open-pais-id"]').click();
                    cy.get('[data-cy="search-pais-id"]').clear();
                    cy.contains('[role="option"]', 'Brasil').then(($brasil) => {
                        cy.wrap($brasil).prevAll('[role="option"]').should('have.length', 0);
                    });
                });
            });
        });
        
        // ════════════════════════════════════════════════════════════════
        // STEP 2 — COORDENAÇÃO / ENDEREÇO
        // ════════════════════════════════════════════════════════════════

        context('Endereço', () => {

            beforeEach(() => {
                cy.wait(500);
                cy.get('[data-cy="coordenacao"]').click();
                cy.get('[data-cy="endereco"]').click();
            
            })

            context('Caminho Feliz', () => {
                it('deve preencher o CEP e autocompletar Logradouro, Bairro, Estado e Município com sucesso', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                    cy.get('[data-cy="criadoPor.endereco.cep"]').clear();
                    cy.get('[data-cy="criadoPor.endereco.cep"]').type(propostaValida.coordenacao.endereco.cep);
                    cy.get('[data-cy="criadoPor.endereco.numero"]').click({ force: true });
                    cy.get('[data-cy="criadoPor.endereco.logradouro"]').should('have.value', propostaValida.coordenacao.endereco.logradouro);
                    cy.get('[data-cy="criadoPor.endereco.bairro"]').should('have.value', propostaValida.coordenacao.endereco.bairro);
                    cy.get('[data-cy="search-estado"]').should('have.value', propostaValida.coordenacao.endereco.estado);
                    cy.get('[data-cy="search-municipio"]').should('have.value', propostaValida.coordenacao.endereco.municipio)
                    

                    })
                })
                it('deve preencher o Endereço completo e avançar para Dados Acadêmicos com sucesso', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.get('[data-cy="criadoPor.endereco.cep"]').clear();
                        cy.get('[data-cy="criadoPor.endereco.cep"]').type(propostaValida.coordenacao.endereco.cep);
                        cy.get('[data-cy="criadoPor.endereco.numero"]').click({ force: true });
                        cy.get('[data-cy="criadoPor.endereco.numero"]').clear().type(propostaValida.coordenacao.endereco.numero);
                        cy.get('[data-cy="criadoPor.endereco.complemento"]').type(propostaValida.coordenacao.endereco.complemento);
                        cy.get('[data-cy="next-button"]').click();
                        cy.contains('Dados do usuário atualizados com sucesso.').should('be.visible');
                    })
                })
            })

            context('Validações', () => {
                it('deve aplicar máscara xxxxx-xxx no CEP e rejeitar entrada fora do padrão', () => {
                    cy.get('@fixture').then(({ propostaValida, propostaInvalida }: any) => {
                        cy.get('[data-cy="criadoPor.endereco.cep"]').clear();
                        cy.get('[data-cy="criadoPor.endereco.cep"]').type(propostaValida.coordenacao.endereco.cepSemHifen);
                        cy.get('[data-cy="criadoPor.endereco.cep"]').should('have.value', propostaValida.coordenacao.endereco.cep);
                        cy.get('[data-cy="criadoPor.endereco.cep"]').clear().type(propostaInvalida.coordenacao.endereco.cep_letras);
                        cy.get('[data-cy="criadoPor.endereco.cep"]').invoke('val').should('not.match', /[A-Za-z]/);
                        cy.get('[data-cy="criadoPor.endereco.cep"]').clear().type(propostaInvalida.coordenacao.endereco.cep_incompleto);
                        cy.get('[data-cy="criadoPor.endereco.cep"]').should('have.value', propostaInvalida.coordenacao.endereco.cep_incompleto);
                        cy.get('[data-cy="next-button"]').click();
                        cy.contains(/Erro/i).should('be.visible');
                    })
                })
            
                it('deve exibir erro quando Logradouro está em branco', () => {
                    cy.get('[data-cy="criadoPor.endereco.logradouro"]').clear();
                    cy.get('[data-cy="next-button"]').click();
                    cy.contains(/Erro/i).should('be.visible');
                })
            
                it('deve exibir erro quando Número está em branco', () => {
                    cy.get('[data-cy="criadoPor.endereco.numero"]').clear();
                    cy.get('[data-cy="next-button"]').click();
                    cy.contains(/Erro/i).should('be.visible');
                })
            
                it('deve exibir erro quando Bairro está em branco', () => {
                    cy.get('[data-cy="criadoPor.endereco.bairro"]').clear();
                    cy.get('[data-cy="next-button"]').click();
                    cy.contains(/Erro/i).should('be.visible');
                })
            
                it('deve exibir erro quando Estado/Região está em branco', () => {
                    cy.get('[data-cy="estado"] > .css-1xjtwhn > .css-dw0r4c').click();
                    cy.get('[data-cy="next-button"]').click();
                    cy.contains(/Erro/i).should('be.visible');
                })
            
                it('deve exibir erro quando Município está em branco', () => {
                    cy.get('[data-cy="municipio"] > .css-1xjtwhn > .css-dw0r4c').click();
                    cy.get('[data-cy="next-button"]').click();
                    cy.contains(/Erro/i).should('be.visible');
                })
            
                it('deve truncar o campo Número no limite máximo de 8 caracteres', () => {
                    cy.get('@fixture').then(({ propostaInvalida }: any) => {
                    cy.get('[data-cy="criadoPor.endereco.numero"]').clear().type(propostaInvalida.coordenacao.endereco.numero_8chars)
                    cy.get('[data-cy="criadoPor.endereco.numero"]').invoke('val').should('have.length', 8)
                    cy.get('[data-cy="criadoPor.endereco.numero"]').clear().type(propostaInvalida.coordenacao.endereco.numero_9chars)
                    cy.get('[data-cy="criadoPor.endereco.numero"]').invoke('val').should('have.length', 8)
                    })
                })
            
                it('deve truncar o campo Complemento no limite máximo de 16 caracteres', () => {
                    cy.get('@fixture').then(({ propostaInvalida }: any) => {
                    cy.get('[data-cy="criadoPor.endereco.complemento"]').clear().type(propostaInvalida.coordenacao.endereco.complemento_16chars)
                    cy.get('[data-cy="criadoPor.endereco.complemento"]').invoke('val').should('have.length', 16)
                    cy.get('[data-cy="criadoPor.endereco.complemento"]').clear().type(propostaInvalida.coordenacao.endereco.complemento_17chars)
                    cy.get('[data-cy="criadoPor.endereco.complemento"]').invoke('val').should('have.length', 16)
                    })
                })
            })
        })

        // ════════════════════════════════════════════════════════════════
        // STEP 2 — COORDENAÇÃO / DADOS ACADÊMICOS
        // ════════════════════════════════════════════════════════════════

        context('Dados Acadêmicos', () => {

            beforeEach(() => {
                cy.wait(500);
                cy.get('[data-cy="coordenacao"]').click();
                cy.get('[data-cy="dados-academicos"]').click();
            
            })

            context('Caminho Feliz', () => {
                it('deve preencher os Dados Acadêmicos e avançar para Dados Profissionais com sucesso', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.selecionarOpcao('open-instituicao-id', 'search-instituicao-id', propostaValida.coordenacao.dadosAcademicos.instituicao);
                        cy.selecionarOpcao('open-unidade-id', 'search-unidade-id', propostaValida.coordenacao.dadosAcademicos.unidade);
                        cy.selecionarOpcao('open-nivel-academico-id', 'search-nivel-academico-id', propostaValida.coordenacao.dadosAcademicos.nivelAcademico);
                        cy.get('[data-cy="criadoPor.lattes"]').type(propostaValida.coordenacao.dadosAcademicos.lattes);
                        cy.get('[data-cy="criadoPor.linkedin"]').type(propostaValida.coordenacao.dadosAcademicos.linkedin);
                        cy.get('[data-cy="next-button"]').click();
                        cy.contains('Dados do usuário atualizados com sucesso.').should('be.visible');
                    });
                });
                it('deve adicionar Área de Conhecimento informando apenas a Grande Área com sucesso', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.get('[data-cy="add-areas-de-conhecimento"]').click();
                        cy.selecionarOpcao('open-grande-area-id', 'search-grande-area-id', propostaValida.coordenacao.dadosAcademicos.areaDeConhecimento.grandeArea);
                        cy.get('[data-cy="criadoPor.areaDeConhecimento-confirmar"]').click();
                        cy.contains('td', propostaValida.coordenacao.dadosAcademicos.areaDeConhecimento.grandeArea).should('be.visible');
                    });
                });
            });

            context('Validações', () => {
                it('deve truncar o campo Currículo Lattes no limite máximo de 1024 caracteres', () => {
                    cy.get('@fixture').then(({ propostaInvalida }: any) => {
                        cy.get('[data-cy="criadoPor.lattes"]').clear().type(propostaInvalida.coordenacao.dadosAcademicos.lattes_acima1024chars);
                        cy.get('[data-cy="criadoPor.lattes"]').invoke('val').then((valor: any) => {
                            expect(valor.length).to.be.at.most(1024);
                        });
                    });
                });
            
                it('deve truncar o campo LinkedIn no limite máximo de 1024 caracteres', () => {
                    cy.get('@fixture').then(({ propostaInvalida }: any) => {
                        cy.get('[data-cy="criadoPor.linkedin"]').clear().type(propostaInvalida.coordenacao.dadosAcademicos.linkedin_acima1024chars);
                        cy.get('[data-cy="criadoPor.linkedin"]').invoke('val').then((valor: any) => {
                            expect(valor.length).to.be.at.most(1024);
                        });
                    });
                });
            
                it('deve listar exatamente as oito opções esperadas no seletor Nível Acadêmico', () => {
                    const opcoesEsperadas = ['Ensino Fundamental', 'Ensino Médio', 'Ensino Médio/Profissionalizante', 'Ensino Superior', 'Especialização', 'Mestrado', 'Doutorado', 'Pós Doutorado']
                    cy.get('[data-cy="open-nivel-academico-id"]').click();
                    opcoesEsperadas.forEach((opcao: string) => {
                    cy.contains('[role="option"]', opcao).scrollIntoView().should('be.visible')
                    });
                });
            
                it('deve selecionar Mestrado e Pós Doutorado individualmente no seletor Nível Acadêmico', () => {
                    cy.selecionarOpcao('open-nivel-academico-id', 'search-nivel-academico-id', 'Mestrado');
                    cy.get('[data-cy="search-nivel-academico-id"]').should('have.value', 'Mestrado');
                    cy.selecionarOpcao('open-nivel-academico-id', 'search-nivel-academico-id', 'Pós Doutorado');
                    cy.get('[data-cy="search-nivel-academico-id"]').should('have.value', 'Pós Doutorado');
                });
            
                it('deve substituir o seletor de Instituição pelos campos Nome e Sigla ao marcar Sugerir Instituição', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.get('[data-cy="search-instituicao-id"]').should('be.visible');
                        cy.get('[data-cy="sugerir-instituicao-box"]').click();
                        cy.get('[data-cy="search-instituicao-id"]').should('not.exist');
                        cy.get('[data-cy="criadoPor.instituicaoNome"]').should('be.visible').type(propostaValida.coordenacao.dadosAcademicos.instituicaoNome);
                        cy.get('[data-cy="criadoPor.instituicaoSigla"]').should('be.visible').type(propostaValida.coordenacao.dadosAcademicos.instituicaoSigla);
                        cy.get('[data-cy="menu-salvar"]').click();
                    })
                })
            
                it('deve substituir o seletor de Unidade pelos campos Nome e Sigla ao marcar Sugerir Unidade', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.get('[data-cy="search-unidade-id"]').should('be.visible');
                        cy.get('[data-cy="sugerir-unidade-box"]').click();
                        cy.get('[data-cy="criadoPor.unidadeNome"]').should('be.visible').type(propostaValida.coordenacao.dadosAcademicos.unidadeNome);
                        cy.get('[data-cy="criadoPor.unidadeSigla"]').should('be.visible').type(propostaValida.coordenacao.dadosAcademicos.unidadeSigla);
                    })
                })
            
                it('deve exibir erro quando Grande Área não é preenchida na Área de Conhecimento', () => {
                    cy.get('[data-cy="add-areas-de-conhecimento"]').click();
                    cy.get('[data-cy="criadoPor.areaDeConhecimento-confirmar"]').click();
                    cy.contains(/Erro/i).should('be.visible');
                })
            
                it('deve habilitar o campo Área somente após a seleção de Grande Área', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.get('[data-cy="add-areas-de-conhecimento"]').click();
                        cy.get('[data-cy="search-area-id"]').should('not.exist');
                        cy.selecionarOpcao('open-grande-area-id', 'search-grande-area-id', propostaValida.coordenacao.dadosAcademicos.areaDeConhecimento.grandeArea);
                        cy.get('[data-cy="search-area-id"]').should('be.visible').and('not.be.disabled');
                    })
                })
            
                it('deve habilitar o campo Subárea somente após a seleção de Área', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.get('[data-cy="add-areas-de-conhecimento"]').click();
                        cy.selecionarOpcao('open-grande-area-id', 'search-grande-area-id', propostaValida.coordenacao.dadosAcademicos.areaDeConhecimento.grandeArea);
                        cy.get('[data-cy="search-sub-area-id"]').should('not.exist');
                        cy.selecionarOpcao('open-area-id', 'search-area-id', propostaValida.coordenacao.dadosAcademicos.areaDeConhecimento.area);
                        cy.get('[data-cy="search-sub-area-id"]').should('be.visible').and('not.be.disabled');
                    })
                })
            
                it('deve habilitar o campo Especialidade somente após a seleção de Subárea', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.get('[data-cy="add-areas-de-conhecimento"]').click();
                        cy.selecionarOpcao('open-grande-area-id', 'search-grande-area-id', propostaValida.coordenacao.dadosAcademicos.areaDeConhecimento.grandeArea);
                        cy.selecionarOpcao('open-area-id', 'search-area-id', propostaValida.coordenacao.dadosAcademicos.areaDeConhecimento.area);
                        cy.get('[data-cy="search-especialidade-id"]').should('not.exist');
                        cy.selecionarOpcao('open-sub-area-id', 'search-sub-area-id', propostaValida.coordenacao.dadosAcademicos.areaDeConhecimento.subArea);
                        cy.get('[data-cy="search-especialidade-id"]').should('be.visible').and('not.be.disabled');
                    })
                })
            })

            context('Editar', () => {
                it('deve editar a Área de Conhecimento com sucesso', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.get('[data-cy="editar-button"]').first().click();
                        cy.selecionarOpcao('open-grande-area-id', 'search-grande-area-id', 'Ciências Biológicas');
                        cy.get('[data-cy="criadoPor.areaDeConhecimento-confirmar"]').click();
                        cy.get('[data-cy="next-button"]').click();
                        cy.contains(/Sucesso/i).should('be.visible');

                    })
                })
            })
        
            context('Excluir', () => {
                it('deve excluir a Área de Conhecimento com sucesso', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.get('[data-cy="apagar-button"]').first().click();
                        cy.get('[data-cy="next-button"]').click();
                        cy.contains(/Sucesso/i).should('be.visible');
                    })
                })
            })
        })

        // ════════════════════════════════════════════════════════════════
        // STEP 3 — COORDENAÇÃO / DADOS PROFISSIONAIS
        // ════════════════════════════════════════════════════════════════

        context('Dados Profissionais', () => {

            beforeEach(() => {
                cy.wait(500);
                cy.get('[data-cy="coordenacao"]').click();
                cy.get('[data-cy="dados-profissionais"]').click();
            
            })

            context('Caminho Feliz', () => {
                it('deve exibir os campos de vínculo ao marcar Possuo vínculo institucional', () => {
                    cy.get('[data-cy="search-tipo-vinculo-instituciona"]').should('not.exist');
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioServico"]').should('not.exist');
                    cy.get('[data-cy="search-regime-trabalho-id"]').should('not.exist');
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]').should('not.exist');
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]').should('not.exist');

                    cy.get('[data-cy="possui-vinculo-institucional"]').click({ force: true })
                    cy.get('[data-cy="search-tipo-vinculo-instituciona"]').should('be.visible');
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioServico"]').should('be.visible');
                    cy.get('[data-cy="search-regime-trabalho-id"]').should('be.visible');
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]').should('be.visible');
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]').should('be.visible');
                })
        
            it('deve preencher os Dados Profissionais com vínculo institucional e avançar para Apresentação com sucesso', () => {
                cy.get('@fixture').then(({ propostaValida }: any) => {
                    cy.get('[data-cy="possui-vinculo-institucional-box"]').click();
                    cy.selecionarOpcao('open-tipo-vinculo-institucional', 'search-tipo-vinculo-instituciona', propostaValida.coordenacao.dadosProfissionais.tipoVinculo);
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioServico"]').type(propostaValida.coordenacao.dadosProfissionais.inicioServico, { force: true });
                    cy.selecionarOpcao('open-regime-trabalho-id', 'search-regime-trabalho-id', propostaValida.coordenacao.dadosProfissionais.regimeTrabalho);
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]').type(propostaValida.coordenacao.dadosProfissionais.funcaoCargo);
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]').type(propostaValida.coordenacao.dadosProfissionais.inicioFuncao, { force: true });
                    cy.get('[data-cy="next-button"]').click();
                    cy.contains(/Sucesso/i).should('be.visible');
                })
            })
        
            it('deve avançar para Apresentação sem marcar vínculo institucional', () => {
                cy.get('[data-cy="possui-vinculo-institucional"]').then(($checkbox) => {
                    if ($checkbox.is(':checked')) {
                        cy.wrap($checkbox).click({ force: true })
                    }
                });
                cy.get('[data-cy="possui-vinculo-institucional"]').should('not.be.checked');
                cy.get('[data-cy="next-button"]').click();
                cy.contains(/Sucesso/i).should('be.visible');
            })
            })

            context('Validações', () => {
                it('deve exibir os campos de vínculo empregatício marcados como obrigatórios ao marcar Possuo vínculo empregatício', () => {
                    cy.marcarVinculoInstitucional()
                    cy.get('[data-cy="possui-vinculo-empregaticio-box"]').should('not.be.checked')
                    cy.marcarVinculoEmpregaticio()
                })
            
                it('deve exibir erro quando Início de Serviço, Regime de Trabalho, Função/Cargo e Início de Função estão em branco com vínculo empregatício marcado', () => {
                    cy.marcarVinculoInstitucional()
                    cy.marcarVinculoEmpregaticio()
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioServico"]').clear({ force: true })
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]').clear()
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]').clear({ force: true })
                    cy.get('[data-cy="next-button"]').click()
                    cy.contains(/Erro/i).should('be.visible');
    
                })
            
                it('deve exibir erro quando apenas Início de Serviço está em branco com vínculo empregatício marcado', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.marcarVinculoInstitucional()
                        cy.marcarVinculoEmpregaticio()
                        cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioServico"]').clear({ force: true })
                        cy.selecionarOpcao('open-regime-trabalho-id', 'search-regime-trabalho-id', propostaValida.coordenacao.dadosProfissionais.regimeTrabalho)
                        cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]').type(propostaValida.coordenacao.dadosProfissionais.funcaoCargo)
                        cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]').type(propostaValida.coordenacao.dadosProfissionais.inicioFuncao, { force: true })
                        cy.get('[data-cy="next-button"]').click()
                        cy.contains(/Erro/i).should('be.visible');

                    })
                })
            
                it('deve exibir erro quando apenas Regime de Trabalho não é selecionado com vínculo empregatício marcado', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.marcarVinculoInstitucional()
                        cy.marcarVinculoEmpregaticio()
                        cy.get('[data-cy="regime-trabalho-id"] > .css-1xjtwhn > .css-dw0r4c').click();
                        cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioServico"]').type(propostaValida.coordenacao.dadosProfissionais.inicioServico, { force: true })
                        cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]').type(propostaValida.coordenacao.dadosProfissionais.funcaoCargo)
                        cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]').type(propostaValida.coordenacao.dadosProfissionais.inicioFuncao, { force: true })
                        cy.get('[data-cy="next-button"]').click()
                        cy.contains(/Erro/i).should('be.visible');
                    })
                })
            
                it('deve exibir erro quando apenas Função/Cargo Atual está em branco com vínculo empregatício marcado', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.marcarVinculoInstitucional()
                        cy.marcarVinculoEmpregaticio()
                        cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]').clear()
                        cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioServico"]').type(propostaValida.coordenacao.dadosProfissionais.inicioServico, { force: true })
                        cy.selecionarOpcao('open-regime-trabalho-id', 'search-regime-trabalho-id', propostaValida.coordenacao.dadosProfissionais.regimeTrabalho)
                        cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]').type(propostaValida.coordenacao.dadosProfissionais.inicioFuncao, { force: true })
                        cy.get('[data-cy="next-button"]').click()
                        cy.contains(/Erro/i).should('be.visible');
                    })
                })
            
                it('deve exibir erro quando apenas Início da Função/Cargo está em branco com vínculo empregatício marcado', () => {
                    cy.get('@fixture').then(({ propostaValida }: any) => {
                        cy.marcarVinculoInstitucional()
                        cy.marcarVinculoEmpregaticio()
                        cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]').clear({ force: true })
                        cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioServico"]').type(propostaValida.coordenacao.dadosProfissionais.inicioServico, { force: true })
                        cy.selecionarOpcao('open-regime-trabalho-id', 'search-regime-trabalho-id', propostaValida.coordenacao.dadosProfissionais.regimeTrabalho)
                        cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]').type(propostaValida.coordenacao.dadosProfissionais.funcaoCargo)
                        cy.get('[data-cy="next-button"]').click()
                        cy.contains(/Erro/i).should('be.visible');
                    })
                })
            
                it('deve listar exatamente as oito opções esperadas no seletor Tipo de Vínculo Institucional', () => {
                    const opcoesEsperadas = ['CLT', 'Cooperativo', 'Autônomo', 'Colaborador', 'Bolsista', 'Estagiário', 'Servidor Público', 'Outros']
                    cy.marcarVinculoInstitucional()
                    cy.get('[data-cy="open-tipo-vinculo-institucional"]').click()
                    opcoesEsperadas.forEach((opcao: string) => {
                    cy.contains('[role="option"]', opcao).scrollIntoView().should('be.visible')
                    })
                })
            
            
                it('deve listar exatamente as três opções esperadas no seletor Regime de Trabalho', () => {
                    const opcoesEsperadas = ['Dedicação Exclusiva', 'Tempo Integral', 'Outros']
                    cy.marcarVinculoInstitucional()
                    cy.get('[data-cy="open-regime-trabalho-id"]').click()
                    opcoesEsperadas.forEach((opcao: string) => {
                    cy.get('[role="option"]:visible').contains(opcao).should('be.visible')
                    })
                })

                it('deve truncar o campo Função/Cargo Atual no limite máximo de 32 caracteres', () => {
                    cy.get('@fixture').then(({ propostaInvalida }: any) => {
                        cy.marcarVinculoInstitucional()
                        cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]').clear().type(propostaInvalida.coordenacao.dadosProfissionais.funcaoCargo_32chars)
                        cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]').invoke('val').then((valor: any) => {
                            expect(valor.length).to.be.at.most(32)
                        })
                        cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]').clear().type(propostaInvalida.coordenacao.dadosProfissionais.funcaoCargo_33chars)
                        cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]').invoke('val').then((valor: any) => {
                            expect(valor.length).to.be.at.most(32)
                        })
                    })
                })
            
                it('deve aplicar máscara DD/MM/AAAA e rejeitar texto no campo Início da Função/Cargo', () => {
                    cy.marcarVinculoInstitucional()
                    cy.marcarVinculoEmpregaticio()
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]').clear({ force: true }).type('04062024', { force: true })
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]').should('have.value', '04/06/2024')
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]').type('{selectall}{backspace}', { force: true })
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]').type('abc', { force: true })
                    cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]').invoke('val').should('not.match', /[a-zA-Z]/)
                })
            
            })
        })


    })
})
