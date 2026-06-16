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