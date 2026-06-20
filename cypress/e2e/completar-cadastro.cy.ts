import 'cypress-file-upload'
import '../support/commands'

describe('Completar Cadastro do Usuário', () => {

    beforeEach(() => {
        cy.loginPorFixture('cadastro-completo')
        cy.fixture('cadastro-completo').as('fixture')
    })

    context('Edição de Perfil', () => {

        beforeEach(() => {
            cy.get('@fixture').then(({ dadosValidos }: any) => {
                cy.visit('https://novo-sig.homolog.ledes.net')
                cy.get('[data-cy="user-menu"]').click()
                cy.get('[data-cy="editar-perfil"]').click()
                cy.wait(500)
            })
        })

        context('Fluxo', () => {
            context('Botão Voltar', () => {
        
                    context('Caminho Feliz', () => {
                        it('deve fechar o Perfil e retornar à tela inicial ao clicar em Voltar no step Dados Pessoais com sucesso', () => {
                            cy.get('[data-cy="dados-pessoais"]').click()
                            cy.get('[data-cy="breadcrumb-voltar"]').click()
                            cy.url().should('include', '/home')
                        })
        
                        it('deve fechar o Perfil e retornar à tela inicial ao clicar em Voltar no step Endereço com sucesso', () => {
                            cy.get('[data-cy="endereco"]').click()
                            cy.get('[data-cy="breadcrumb-voltar"]').click()
                            cy.url().should('include', '/home')
                        })
        
                        it('deve fechar o Perfil e retornar à tela inicial ao clicar em Voltar no step Dados Acadêmicos com sucesso', () => {
                            cy.get('[data-cy="dados-academicos"]').click()
                            cy.get('[data-cy="breadcrumb-voltar"]').click()
                            cy.url().should('include', '/home')
                        })
        
                        it('deve fechar o Perfil e retornar à tela inicial ao clicar em Voltar no step Dados Profissionais com sucesso', () => {
                            cy.get('[data-cy="dados-profissionais"]').click()
                            cy.get('[data-cy="breadcrumb-voltar"]').click()
                            cy.url().should('include', '/home')
                        })
        
                        it('deve fechar o Perfil e retornar à tela inicial ao clicar em Voltar no step Documentos Pessoais com sucesso', () => {
                            cy.get('[data-cy="documentos-pessoais"]').click()
                            cy.get('[data-cy="breadcrumb-voltar"]').click()
                            cy.url().should('include', '/home')
                        })
                    })
                })
        
                // ════════════════════════════════════════════════════════════════
                // CT-NS-PROP-002 — Finalizar salva alterações de todos os steps
                // ════════════════════════════════════════════════════════════════
        
                context('Finalizar', () => {
        
                    context('Caminho Feliz', () => {
                        it('deve salvar alterações de todos os steps e persistir os dados ao clicar em Finalizar com sucesso', () => {
                            cy.get('@fixture').then(({ dadosValidos }: any) => {
                                cy.get('[data-cy="dados-pessoais"]').click()
                                cy.get('[data-cy="nome"]').clear().type(dadosValidos.dadosPessoais.nome)
                                cy.get('[data-cy="dataNascimento"]').type(dadosValidos.dadosPessoais.dataNascimento, { force: true })
                                cy.selecionarOpcao('open-pais-id', 'search-pais-id', dadosValidos.dadosPessoais.pais)
                                cy.get('[data-cy="next-button"]').click()
        
                                cy.wait(500)
                                cy.get('[data-cy="endereco.cep"]').clear().type(dadosValidos.endereco.cep)
                                cy.get('[data-cy="endereco.numero"]').click({ force: true })
                                cy.get('[data-cy="endereco.numero"]').clear().type(dadosValidos.endereco.numero)
                                cy.get('[data-cy="next-button"]').click()
        
                                cy.wait(500)
                                cy.selecionarOpcao('open-instituicao-id', 'search-instituicao-id', dadosValidos.dadosAcademicos.instituicao)
                                cy.selecionarOpcao('open-nivel-academico-id', 'search-nivel-academico-id', dadosValidos.dadosAcademicos.nivelAcademico)
                                cy.get('[data-cy="next-button"]').click()
        
                                cy.wait(500)
                                cy.get('[data-cy="next-button"]').click()
        
                                cy.wait(500)
                                cy.get('[data-cy="menu-finalizar"]').click()
                                cy.contains(/Sucesso/i).should('be.visible')
        
                        
                            })
                        })
                    })
                })
            })

        context('Dados Pessoais', () => {
 
            beforeEach(() => {
                cy.wait(500)
                cy.get('[data-cy="dados-pessoais"]').click()
            })
 
            context('Caminho Feliz', () => {
                it('deve preencher todos os campos de Dados Pessoais com país Brasil e avançar para Endereço com sucesso', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.get('[data-cy="email"]').should('be.disabled')
                        cy.get('[data-cy="nome"]').clear().type(dadosValidos.dadosPessoais.nome)
                        cy.get('[data-cy="dataNascimento"]').type(dadosValidos.dadosPessoais.dataNascimento, { force: true })
                        cy.selecionarOpcao('open-raca-cor-id', 'search-raca-cor-id', dadosValidos.dadosPessoais.racaCor)
                        cy.selecionarOpcao('open-pais-id', 'search-pais-id', dadosValidos.dadosPessoais.pais)
                        cy.get('[data-cy="documento"]').should('be.visible')
                        cy.get('[data-cy="documento"]').type(dadosValidos.dadosPessoais.cpf)
                        cy.get('[data-cy="next-button"]').click()
                        cy.contains(/Sucesso/i).should('be.visible')
                    })
                })
            })
 
            context('Validações', () => {
                it('deve exibir erro quando Nome está em branco ao tentar avançar', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.get('[data-cy="nome"]').clear()
                        cy.get('[data-cy="next-button"]').click()
                        cy.contains(/Erro/i).should('be.visible')
                    })
                })
 
                it('deve truncar o campo Nome no limite máximo de 64 caracteres', () => {
                    cy.get('@fixture').then(({ dadosInvalidos }: any) => {
                        cy.get('[data-cy="nome"]').clear().type(dadosInvalidos.dadosPessoais.nome_64chars)
                        cy.get('[data-cy="nome"]').invoke('val').should('have.length', 64)
                        cy.get('[data-cy="nome"]').clear().type(dadosInvalidos.dadosPessoais.nome_65chars)
                        cy.get('[data-cy="nome"]').invoke('val').should('have.length', 64)
                    })
                })
 
                it.only('deve truncar o campo Nome Social no limite máximo de 64 caracteres', () => {
                    cy.get('@fixture').then(({ dadosInvalidos }: any) => {
                        cy.get('[data-cy="possuo-nome-social"]').then(($checkbox) => {
                            if (!$checkbox.is(':checked')) {
                                cy.get('[data-cy="possuo-nome-social-box"]').click({ force: true })
                            }
                        })
                        cy.get('[data-cy="criadoPor.nomeSocial"]').clear().type(dadosInvalidos.dadosPessoais.nomeSocial_64chars)
                        cy.get('[data-cy="criadoPor.nomeSocial"]').invoke('val').should('have.length', 64)
                        cy.get('[data-cy="possuo-nome-social"]').then(($checkbox) => {
                            if (!$checkbox.is(':checked')) {
                                cy.get('[data-cy="possuo-nome-social-box"]').click({ force: true })
                            }
                        })
                        cy.get('[data-cy="criadoPor.nomeSocial"]').clear().type(dadosInvalidos.dadosPessoais.nomeSocial_65chars, { force: true })
                        cy.get('[data-cy="criadoPor.nomeSocial"]').invoke('val').should('have.length', 64)
                    })
                })
 
                it('deve exibir erro quando Data de Nascimento está em branco ao tentar salvar', () => {
                    cy.get('[data-cy="dataNascimento"]').clear().type('{selectall}{backspace}', { force: true })
                    cy.get('[data-cy="menu-salvar"]').click()
                    cy.contains(/Erro/i).should('be.visible')
                })
 
                it('deve exibir erro quando Data de Nascimento é posterior à data atual', () => {
                    cy.get('@fixture').then(({dadosInvalidos }: any) => {
                        cy.get('[data-cy="dataNascimento"]').clear().type(dadosInvalidos.dadosPessoais.dataNascimento_futura, { force: true })
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Erro/i).should('be.visible')
                    })
                })
 
                it('deve exibir erro quando País não é selecionado ao tentar avançar', () => {
                    cy.get('[data-cy="pais-id"] > .css-1xjtwhn > .css-dw0r4c').click();
                    cy.contains(/Erro/i).should('be.visible')
                })
 
                it('deve exibir erro quando CPF informado é inválido', () => {
                    cy.get('@fixture').then(({ dadosInvalidos }: any) => {
                        cy.get('[data-cy="documento"]').type(dadosInvalidos.dadosPessoais.cpf_invalido)
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Erro/i).should('be.visible')
                    })
                })
 
                it('deve ocultar o campo CPF quando o país selecionado é diferente de Brasil', () => {
                    cy.get('@fixture').then(({dadosInvalidos }: any) => {
                        cy.selecionarOpcao('open-pais-id', 'search-pais-id', dadosInvalidos.dadosPessoais.paisEstrangeiro)
                        cy.get('[data-cy="criadoPor.documento"]').should('not.exist')
                    })
                })
 
                it('deve exibir Brasil como primeira opção no seletor de País', () => {
                    cy.get('[data-cy="open-pais-id"]').click()
                    cy.get('[data-cy="search-pais-id"]').clear()
                    cy.contains('[role="option"]', 'Brasil').then(($brasil) => {
                        cy.wrap($brasil).prevAll('[role="option"]').should('have.length', 0)
                    })
                    cy.get('[data-cy="close-pais-id"]').click()
                })
 
                it('deve listar exatamente as cinco opções esperadas no seletor Raça/Cor', () => {
                    const opcoesEsperadas = ['Branco(a)', 'Pardo(a)', 'Preto(a)', 'Amarelo(a)', 'Indígena']
                    cy.get('[data-cy="open-raca-cor-id"]').click()
                    opcoesEsperadas.forEach((opcao: string) => {
                        cy.contains('[role="option"]', opcao).should('be.visible')
                    })
                    cy.get('[data-cy="close-raca-cor-id"]').click()
                })
            })
        })

        // ════════════════════════════════════════════════════════════════
        // STEP 1 — ENDEREÇO
        // ════════════════════════════════════════════════════════════════

        context('Endereço', () => {

            beforeEach(() => {
                cy.wait(500)
                cy.get('[data-cy="endereco"]').click()
            })

            context('Caminho Feliz', () => {
                it('deve preencher o CEP e autocompletar Logradouro, Bairro, Estado e Município com sucesso', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.get('[data-cy="dados-pessoais"]').click()
                        cy.selecionarOpcao('open-pais-id', 'search-pais-id', dadosValidos.dadosPessoais.pais)
                        cy.get('[data-cy="endereco"]').click()
                        cy.get('[data-cy="endereco.cep"]').clear().type(dadosValidos.endereco.cep)
                        cy.get('[data-cy="endereco.numero"]').click({ force: true })
                        cy.get('[data-cy="endereco.logradouro"]').should('have.value', dadosValidos.endereco.logradouro)
                        cy.get('[data-cy="endereco.bairro"]').should('have.value', dadosValidos.endereco.bairro)
                        cy.get('[data-cy="search-estado"]').should('have.value', dadosValidos.endereco.estado)
                        cy.get('[data-cy="search-municipio"]').should('have.value', dadosValidos.endereco.municipio)
                    })
                })

                it('deve exibir e preencher os campos de endereço internacional com sucesso quando o país for diferente de Brasil', () => {
                    cy.get('@fixture').then(({ dadosValidos}: any) => {                
                        cy.get('[data-cy="dados-pessoais"]').click()
                        cy.selecionarOpcao('open-pais-id', 'search-pais-id', dadosValidos.dadosPessoais.paisEstrangeiro)
                        cy.get('[data-cy="endereco"]').click()
                        cy.get('[data-cy="endereco.cep"]').type(dadosValidos.enderecoEstrangeiro.zipCode)
                        cy.get('[data-cy="endereco.logradouro"]').type(dadosValidos.enderecoEstrangeiro.logradouro)
                        cy.get('[data-cy="endereco.estado"]').type(dadosValidos.enderecoEstrangeiro.estadoRegiao)
                        cy.get('[data-cy="endereco.municipio"]').type(dadosValidos.enderecoEstrangeiro.municipio)
                        cy.get('[data-cy="next-button"]').click()
                    })
                })

                it('deve preencher o Endereço completo e salvar com sucesso', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.get('[data-cy="dados-pessoais"]').click()
                        cy.selecionarOpcao('open-pais-id', 'search-pais-id', dadosValidos.dadosPessoais.pais)
                        cy.get('[data-cy="endereco"]').click()
                        cy.get('[data-cy="endereco.cep"]').clear().type(dadosValidos.endereco.cep)
                        cy.get('[data-cy="endereco.numero"]').click({ force: true })
                        cy.get('[data-cy="endereco.numero"]').clear().type(dadosValidos.endereco.numero)
                        cy.get('[data-cy="endereco.complemento"]').clear().type(dadosValidos.endereco.complemento)
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Sucesso/i).should('be.visible')
                    })
                })
            })

            context('Validações', () => {
                it('deve aplicar máscara xxxxx-xxx no CEP e rejeitar entrada fora do padrão', () => {
                    cy.get('@fixture').then(({ dadosValidos, dadosInvalidos }: any) => {
                        cy.get('[data-cy="endereco.cep"]').clear().type(dadosValidos.endereco.cepSemHifen)
                        cy.get('[data-cy="endereco.cep"]').should('have.value', dadosValidos.endereco.cep)
                        cy.get('[data-cy="endereco.cep"]').clear().type(dadosInvalidos.endereco.cep_letras)
                        cy.get('[data-cy="endereco.cep"]').invoke('val').should('not.match', /[A-Za-z]/)
                        cy.get('[data-cy="endereco.cep"]').clear().type(dadosInvalidos.endereco.cep_incompleto)
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Erro/i).should('be.visible')
                    })
                })

                it('deve exibir erro quando CEP é inexistente', () => {
                    cy.get('@fixture').then(({ dadosInvalidos }: any) => {
                        cy.intercept('GET', '**/viacep.com.br/ws/**').as('buscarCep')
                        cy.get('[data-cy="endereco.cep"]').clear().type(dadosInvalidos.endereco.cep_inexistente)
                        cy.get('[data-cy="endereco.numero"]').click({ force: true })
                        cy.wait('@buscarCep')
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Erro/i).should('be.visible')
                    })
                })

                it('deve exibir erro quando Logradouro está em branco', () => {
                    cy.get('[data-cy="endereco.logradouro"]').clear()
                    cy.get('[data-cy="menu-salvar"]').click()
                    cy.contains(/Erro/i).should('be.visible')
                })

                it('deve exibir erro quando Número está em branco', () => {
                    cy.get('[data-cy="endereco.numero"]').clear()
                    cy.get('[data-cy="menu-salvar"]').click()
                    cy.contains(/Erro/i).should('be.visible')
                })

                it('deve exibir erro quando Bairro está em branco', () => {
                    cy.get('[data-cy="endereco.bairro"]').clear()
                    cy.get('[data-cy="menu-salvar"]').click()
                    cy.contains(/Erro/i).should('be.visible')
                })

                it('deve truncar o campo Número no limite máximo de 8 caracteres', () => {
                    cy.get('@fixture').then(({ dadosInvalidos }: any) => {
                        cy.get('[data-cy="endereco.numero"]').clear().type(dadosInvalidos.endereco.numero_9chars)
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Erro/i).should('be.visible')
                    })
                })

                it('deve truncar o campo Complemento no limite máximo de 16 caracteres', () => {
                    cy.get('@fixture').then(({ dadosInvalidos }: any) => {
                        cy.get('[data-cy="endereco.complemento"]').clear().type(dadosInvalidos.endereco.complemento_17chars)
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Erro/i).should('be.visible')                    
                    })
                })

                it('deve exibir erro quando Zip Code está em branco', () => {
                    cy.get('@fixture').then(({ dadosValidos, dadosInvalidos }: any) => {
                        cy.get('[data-cy="dados-pessoais"]').click()
                        cy.selecionarOpcao('open-pais-id', 'search-pais-id', dadosValidos.dadosPessoais.paisEstrangeiro)
                        cy.get('[data-cy="endereco"]').click()
                        cy.get('[data-cy="endereco.cep"]').clear();
                        cy.get('[data-cy="endereco.logradouro"]').type(dadosValidos.enderecoEstrangeiro.logradouro)
                        cy.get('[data-cy="endereco.estado"]').type(dadosValidos.enderecoEstrangeiro.estadoRegiao)
                        cy.get('[data-cy="endereco.municipio"]').type(dadosValidos.enderecoEstrangeiro.municipio)
                        cy.get('[data-cy="next-button"]').click()
                        cy.contains(/Erro/i).should('be.visible')                    
                    })
                })
            
                it('deve limitar o Zip Code a 9 caracteres', () => {
                    cy.get('@fixture').then(({ dadosInvalidos }: any) => {
                        cy.get('[data-cy="endereco.cep"]').type(dadosInvalidos.enderecoEstrangeiroInvalido.zipCode_acima9chars)
                        cy.get('[data-cy="endereco.cep"]').invoke('val').then((val) => {
                            expect((val as string).length).to.be.lte(9)
                        })
                    })
                })
            
                it('deve limitar o Município a 32 caracteres', () => {
                    cy.get('@fixture').then(({ dadosInvalidos }: any) => {
                        cy.get('[data-cy="endereco.municipio"]').type(dadosInvalidos.enderecoEstrangeiroInvalido.municipio_acima32chars)
                        cy.get('[data-cy="endereco.municipio"]').invoke('val').then((val) => {
                            expect((val as string).length).to.be.lte(32)
                        })
                    })
                })
            })
        })

        // ════════════════════════════════════════════════════════════════
        // STEP 2 — DADOS ACADÊMICOS
        // ════════════════════════════════════════════════════════════════

        context('Dados Acadêmicos', () => {

            beforeEach(() => {
                cy.wait(500)
                cy.get('[data-cy="dados-academicos"]').click()
            })

            context('Caminho Feliz', () => {
                it('deve preencher os Dados Acadêmicos e salvar com sucesso', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.selecionarOpcao('search-instituicao-id', 'search-instituicao-id', dadosValidos.dadosAcademicos.instituicao)
                        cy.selecionarOpcao('search-unidade-id', 'search-unidade-id', dadosValidos.dadosAcademicos.unidade)
                        cy.selecionarOpcao('search-nivel-academico-id', 'search-nivel-academico-id', dadosValidos.dadosAcademicos.nivelAcademico)
                        cy.get('[data-cy="lattes"]').clear().type(dadosValidos.dadosAcademicos.lattes)
                        cy.get('[data-cy="linkedin"]').clear().type(dadosValidos.dadosAcademicos.linkedin)
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Sucesso/i).should('be.visible')
                    })
                })

                it('deve adicionar Área de Conhecimento informando apenas a Grande Área com sucesso', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.get('[data-cy="add-areas-de-conhecimento"]').click()
                        cy.selecionarOpcao('open-grande-area-id', 'search-grande-area-id', dadosValidos.dadosAcademicos.areaDeConhecimento.grandeArea)
                        cy.get('[data-cy="areaDeConhecimento-confirmar"]').click()
                        cy.contains('td', dadosValidos.dadosAcademicos.areaDeConhecimento.grandeArea).should('be.visible')
                    })
                })

                it('deve substituir o seletor de Instituição pelos campos Nome e Sigla ao marcar Sugerir Instituição com sucesso', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.get('[data-cy="search-instituicao-id"]').should('be.visible')
                        cy.get('[data-cy="sugerir-instituicao-box"]').click()
                        cy.get('[data-cy="search-instituicao-id"]').should('not.exist')
                        cy.get('[data-cy="instituicaoNome"]').should('be.visible').type(dadosValidos.dadosAcademicos.instituicaoNome)
                        cy.get('[data-cy="instituicaoSigla"]').should('be.visible').type(dadosValidos.dadosAcademicos.instituicaoSigla)
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Sucesso/i).should('be.visible')
                    })
                })

                it('deve substituir o seletor de Unidade pelos campos Nome e Sigla ao marcar Sugerir Unidade com sucesso', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.get('[data-cy="search-unidade-id"]').should('be.visible')
                        cy.get('[data-cy="sugerir-unidade-box"]').click()
                        cy.get('[data-cy="unidadeNome"]').should('be.visible').type(dadosValidos.dadosAcademicos.unidadeNome)
                        cy.get('[data-cy="unidadeSigla"]').should('be.visible').type(dadosValidos.dadosAcademicos.unidadeSigla)
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Sucesso/i).should('be.visible')
                    })
                })

                it('deve listar exatamente as oito opções esperadas no seletor Nível Acadêmico com sucesso', () => {
                    const opcoesEsperadas = ['Ensino Fundamental', 'Ensino Médio', 'Ensino Médio/Profissionalizante', 'Ensino Superior', 'Especialização', 'Mestrado', 'Doutorado', 'Pós Doutorado']
                    cy.get('[data-cy="search-nivel-academico-id"]').click()
                    opcoesEsperadas.forEach((opcao: string) => {
                        cy.contains('[role="option"]', opcao).scrollIntoView().should('be.visible')
                    })
                })
            })

            context('Validações', () => {
                it('deve truncar o campo Currículo Lattes no limite máximo de 1024 caracteres', () => {
                    cy.get('@fixture').then(({ dadosInvalidos }: any) => {
                        cy.get('[data-cy="lattes"]').clear().type(dadosInvalidos.dadosAcademicos.lattes_acima1024chars)
                        cy.get('[data-cy="lattes"]').invoke('val').then((valor: any) => {
                            expect(valor.length).to.be.at.most(1024)
                        })
                    })
                })

                it('deve truncar o campo LinkedIn no limite máximo de 1024 caracteres', () => {
                    cy.get('@fixture').then(({ dadosInvalidos }: any) => {
                        cy.get('[data-cy="linkedin"]').clear().type(dadosInvalidos.dadosAcademicos.linkedin_acima1024chars)
                        cy.get('[data-cy="linkedin"]').invoke('val').then((valor: any) => {
                            expect(valor.length).to.be.at.most(1024)
                        })
                    })
                })

                it('deve exibir erro quando Grande Área não é preenchida na Área de Conhecimento', () => {
                    cy.get('[data-cy="add-areas-de-conhecimento"]').click()
                    cy.get('[data-cy="areaDeConhecimento-confirmar"]').click()
                    cy.contains(/Erro/i).should('be.visible')
                })

                it('deve habilitar o campo Área somente após a seleção de Grande Área', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.get('[data-cy="add-areas-de-conhecimento"]').click()
                        cy.get('[data-cy="search-area-id"]').should('not.exist')
                        cy.selecionarOpcao('open-grande-area-id', 'search-grande-area-id', dadosValidos.dadosAcademicos.areaDeConhecimento.grandeArea)
                        cy.get('[data-cy="search-area-id"]').should('be.visible').and('not.be.disabled')
                    })
                })

                it('deve habilitar o campo Subárea somente após a seleção de Área', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.get('[data-cy="add-areas-de-conhecimento"]').click()
                        cy.selecionarOpcao('open-grande-area-id', 'search-grande-area-id', dadosValidos.dadosAcademicos.areaDeConhecimento.grandeArea)
                        cy.get('[data-cy="search-sub-area-id"]').should('not.exist')
                        cy.selecionarOpcao('search-area-id', 'search-area-id', dadosValidos.dadosAcademicos.areaDeConhecimento.area)
                        cy.get('[data-cy="search-sub-area-id"]').should('be.visible').and('not.be.disabled')
                    })
                })

                it('deve habilitar o campo Especialidade somente após a seleção de Subárea', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.get('[data-cy="add-areas-de-conhecimento"]').click()
                        cy.selecionarOpcao('open-grande-area-id', 'search-grande-area-id', dadosValidos.dadosAcademicos.areaDeConhecimento.grandeArea)
                        cy.selecionarOpcao('search-area-id', 'search-area-id', dadosValidos.dadosAcademicos.areaDeConhecimento.area)
                        cy.get('[data-cy="search-especialidade-id"]').should('not.exist')
                        cy.selecionarOpcao('open-sub-area-id', 'search-sub-area-id', dadosValidos.dadosAcademicos.areaDeConhecimento.subArea)
                        cy.get('[data-cy="search-especialidade-id"]').should('be.visible').and('not.be.disabled')
                    })
                })
            })

            context('Editar', () => {
                it('deve editar a Área de Conhecimento com sucesso', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.get('[data-cy="editar-button"]').first().click()
                        cy.selecionarOpcao('open-grande-area-id', 'search-grande-area-id', dadosValidos.dadosAcademicosEdicao.grandeArea)
                        cy.get('[data-cy="areaDeConhecimento-confirmar"]').click()
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Sucesso/i).should('be.visible')
                    })
                })
            })

            context('Excluir', () => {
                it('deve excluir a Área de Conhecimento com sucesso', () => {
                    cy.get('[data-cy="apagar-button"]').first().click()
                    cy.get('[data-cy="menu-salvar"]').click()
                    cy.contains(/Sucesso/i).should('be.visible')
                })
            })
        })

        // ════════════════════════════════════════════════════════════════
        // STEP 3 — DADOS PROFISSIONAIS
        // ════════════════════════════════════════════════════════════════

        context('Dados Profissionais', () => {

            beforeEach(() => {
                cy.wait(500)
                cy.get('[data-cy="dados-profissionais"]').click()
            })

            context('Caminho Feliz', () => {
                it('deve exibir os campos de vínculo ao marcar Possuo vínculo institucional com sucesso', () => {
                    cy.get('body').then(($body) => {
                        if (!$body.find('[data-cy="search-tipo-vinculo-instituciona"]').is(':visible')) {
                            cy.get('[data-cy="possui-vinculo-institucional-box"]').click({ force: true })
                        }
                    })
                    cy.get('[data-cy="search-tipo-vinculo-instituciona"]').should('be.visible')
                    cy.get('[data-cy="vinculoInstitucional.inicioServico"]').should('be.visible')
                    cy.get('[data-cy="search-regime-trabalho-id"]').should('be.visible')
                    cy.get('[data-cy="vinculoInstitucional.funcao"]').should('be.visible')
                    cy.get('[data-cy="vinculoInstitucional.inicioFuncao"]').should('be.visible')
                })

                it('deve preencher os Dados Profissionais com vínculo institucional e salvar com sucesso', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.get('body').then(($body) => {
                            if (!$body.find('[data-cy="search-tipo-vinculo-instituciona"]').is(':visible')) {
                                cy.get('[data-cy="possui-vinculo-institucional-box"]').click({ force: true })
                            }
                        })
                        cy.selecionarOpcao('search-tipo-vinculo-instituciona', 'search-tipo-vinculo-instituciona', dadosValidos.dadosProfissionais.tipoVinculo)
                        cy.get('[data-cy="possui-vinculo-empregaticio-box"]').click({ force: true })
                        cy.get('[data-cy="vinculoInstitucional.inicioServico"]').type(dadosValidos.dadosProfissionais.inicioServico, { force: true })
                        cy.selecionarOpcao('search-regime-trabalho-id', 'search-regime-trabalho-id', dadosValidos.dadosProfissionais.regimeTrabalho)
                        cy.get('[data-cy="vinculoInstitucional.funcao"]').clear().type(dadosValidos.dadosProfissionais.funcaoCargo)
                        cy.get('[data-cy="vinculoInstitucional.inicioFuncao"]').type(dadosValidos.dadosProfissionais.inicioFuncao, { force: true })
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Sucesso/i).should('be.visible')
                    })
                })

                it('deve salvar os Dados Profissionais sem marcar vínculo institucional com sucesso', () => {
                    cy.get('body').then(($body) => {
                        if ($body.find('[data-cy="search-tipo-vinculo-instituciona"]').is(':visible')) {
                            cy.get('[data-cy="possui-vinculo-institucional-box"]').click({ force: true })
                        }
                    })
                    cy.get('[data-cy="possui-vinculo-institucional-box"]').should('not.be.checked')
                    cy.get('[data-cy="menu-salvar"]').click()
                    cy.contains(/Sucesso/i).should('be.visible')
                })
            })

            context('Validações', () => {
                it('deve exibir erro quando Início de Serviço, Regime, Função e Início de Função estão em branco com vínculo empregatício marcado', () => {
                    cy.marcarVinculoInstitucional()
                    cy.marcarVinculoEmpregaticio()
                    cy.get('[data-cy="vinculoInstitucional.inicioServico"]').clear({ force: true })
                    cy.get('[data-cy="vinculoInstitucional.funcao"]').clear()
                    cy.get('[data-cy="vinculoInstitucional.inicioFuncao"]').clear({ force: true })
                    cy.get('[data-cy="menu-salvar"]').click()
                    cy.contains(/Erro/i).should('be.visible')
                })

                it('deve exibir erro quando apenas Início de Serviço está em branco com vínculo empregatício marcado', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.marcarVinculoInstitucional()
                        cy.marcarVinculoEmpregaticio()
                        cy.get('[data-cy="vinculoInstitucional.inicioServico"]').clear({ force: true })
                        cy.selecionarOpcao('search-regime-trabalho-id', 'search-regime-trabalho-id', dadosValidos.dadosProfissionais.regimeTrabalho)
                        cy.get('[data-cy="vinculoInstitucional.funcao"]').clear().type(dadosValidos.dadosProfissionais.funcaoCargo)
                        cy.get('[data-cy="vinculoInstitucional.inicioFuncao"]').type(dadosValidos.dadosProfissionais.inicioFuncao, { force: true })
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Erro/i).should('be.visible')
                    })
                })

                it('deve exibir erro quando apenas Regime de Trabalho não é selecionado com vínculo empregatício marcado', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.marcarVinculoInstitucional()
                        cy.marcarVinculoEmpregaticio()
                        cy.get('[data-cy="regime-trabalho-id"] > .css-1xjtwhn > .css-dw0r4c').click()
                        cy.get('[data-cy="vinculoInstitucional.inicioServico"]').type(dadosValidos.dadosProfissionais.inicioServico, { force: true })
                        cy.get('[data-cy="vinculoInstitucional.funcao"]').clear().type(dadosValidos.dadosProfissionais.funcaoCargo)
                        cy.get('[data-cy="vinculoInstitucional.inicioFuncao"]').type(dadosValidos.dadosProfissionais.inicioFuncao, { force: true })
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Erro/i).should('be.visible')
                    })
                })

                it('deve exibir erro quando apenas Função/Cargo está em branco com vínculo empregatício marcado', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.marcarVinculoInstitucional()
                        cy.marcarVinculoEmpregaticio()
                        cy.get('[data-cy="vinculoInstitucional.funcao"]').clear()
                        cy.get('[data-cy="vinculoInstitucional.inicioServico"]').type(dadosValidos.dadosProfissionais.inicioServico, { force: true })
                        cy.selecionarOpcao('search-regime-trabalho-id', 'search-regime-trabalho-id', dadosValidos.dadosProfissionais.regimeTrabalho)
                        cy.get('[data-cy="vinculoInstitucional.inicioFuncao"]').type(dadosValidos.dadosProfissionais.inicioFuncao, { force: true })
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Erro/i).should('be.visible')
                    })
                })

                it('deve exibir erro quando apenas Início da Função/Cargo está em branco com vínculo empregatício marcado', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.marcarVinculoInstitucional()
                        cy.marcarVinculoEmpregaticio()
                        cy.get('[data-cy="vinculoInstitucional.inicioFuncao"]').clear({ force: true })
                        cy.get('[data-cy="vinculoInstitucional.inicioServico"]').type(dadosValidos.dadosProfissionais.inicioServico, { force: true })
                        cy.selecionarOpcao('search-regime-trabalho-id', 'search-regime-trabalho-id', dadosValidos.dadosProfissionais.regimeTrabalho)
                        cy.get('[data-cy="vinculoInstitucional.funcao"]').clear().type(dadosValidos.dadosProfissionais.funcaoCargo)
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Erro/i).should('be.visible')
                    })
                })

                it('deve listar exatamente as oito opções esperadas no seletor Tipo de Vínculo Institucional', () => {
                    const opcoesEsperadas = ['CLT', 'Cooperativo', 'Autônomo', 'Colaborador', 'Bolsista', 'Estagiário', 'Servidor Público', 'Outros']
                    cy.marcarVinculoInstitucional()
                    cy.get('[data-cy="search-tipo-vinculo-instituciona"]').click()
                    opcoesEsperadas.forEach((opcao: string) => {
                        cy.contains('[role="option"]', opcao).scrollIntoView().should('be.visible')
                    })
                })

                it('deve listar exatamente as três opções esperadas no seletor Regime de Trabalho', () => {
                    const opcoesEsperadas = ['Dedicação Exclusiva', 'Tempo Integral', 'Outros']
                    cy.marcarVinculoInstitucional()
                    cy.get('[data-cy="search-regime-trabalho-id"]').click()
                    opcoesEsperadas.forEach((opcao: string) => {
                        cy.get('[role="option"]:visible').contains(opcao).should('be.visible')
                    })
                })

                it('deve truncar o campo Função/Cargo Atual no limite máximo de 32 caracteres', () => {
                    cy.get('@fixture').then(({ dadosInvalidos }: any) => {
                        cy.marcarVinculoInstitucional()
                        cy.get('[data-cy="vinculoInstitucional.funcao"]').clear().type(dadosInvalidos.dadosProfissionais.funcaoCargo_32chars)
                        cy.get('[data-cy="vinculoInstitucional.funcao"]').invoke('val').then((valor: any) => {
                            expect(valor.length).to.be.at.most(32)
                        })
                        cy.get('[data-cy="vinculoInstitucional.funcao"]').clear().type(dadosInvalidos.dadosProfissionais.funcaoCargo_33chars)
                        cy.get('[data-cy="vinculoInstitucional.funcao"]').invoke('val').then((valor: any) => {
                            expect(valor.length).to.be.at.most(32)
                        })
                    })
                })

                it('deve aplicar máscara DD/MM/AAAA e rejeitar texto no campo Início da Função/Cargo', () => {
                    cy.marcarVinculoInstitucional()
                    cy.marcarVinculoEmpregaticio()
                    cy.get('[data-cy="vinculoInstitucional.inicioFuncao"]').clear({ force: true }).type('04062024', { force: true })
                    cy.get('[data-cy="vinculoInstitucional.inicioFuncao"]').should('have.value', '04/06/2024')
                    cy.get('[data-cy="vinculoInstitucional.inicioFuncao"]').type('{selectall}{backspace}', { force: true })
                    cy.get('[data-cy="vinculoInstitucional.inicioFuncao"]').type('abc', { force: true })
                    cy.get('[data-cy="vinculoInstitucional.inicioFuncao"]').invoke('val').should('not.match', /[a-zA-Z]/)
                })
            })
        })

        // ════════════════════════════════════════════════════════════════
        // STEP 4 — DOCUMENTOS PESSOAIS
        // ════════════════════════════════════════════════════════════════

        context('Documentos Pessoais', () => {

            beforeEach(() => {
                cy.wait(500)
                cy.get('[data-cy="documentos-pessoais"]').click()
            })

            context('Caminho Feliz', () => {
                it('deve selecionar tipo de documento, realizar upload e finalizar cadastro com sucesso', () => {
                    cy.get('@fixture').then(({dadosValidos}: any) => {
                        cy.get('[data-cy="select-categories-usuario-anexo"]').click()
                        cy.contains('[role="option"]', dadosValidos.documentosPessoais.categoria).first().click({ force: true })
                        cy.get('input[type="file"]').attachFile(dadosValidos.documentosPessoais.arquivo) // REPORT: sem data-cy
                        cy.get('[data-cy="menu-finalizar"]').click()
                        cy.contains(/Sucesso/i).should('be.visible')
                    })
                })
    
                it('deve anexar e salvar documento pessoal com sucesso', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.get('[data-icon="trash"]').first().click()
                        cy.contains('[role="option"]', dadosValidos.documentosPessoais.categoria).first().click({ force: true })
                        cy.get('input[type="file"]').attachFile(dadosValidos.documentosPessoais.arquivo) // REPORT: sem data-cy
                        cy.get('[data-cy="menu-salvar"]').click()
                        cy.contains(/Sucesso/i).should('be.visible')
                    })
                })
            })

            context('Validações', () => {
                it('deve bloquear upload de arquivo com formato não permitido', () => {
                    cy.get('@fixture').then(({ dadosInvalidos, dadosValidos }: any) => {
                        cy.get('[data-icon="trash"]').first().click()
                        cy.get('[data-cy="select-categories-usuario-anexo"]').click()
                        cy.contains('[role="option"]', dadosInvalidos.documentosPessoais.categoria).first().click({ force: true })
                        cy.get('input[type="file"]').attachFile(dadosInvalidos.documentosPessoais.arquivo_formato_invalido) // REPORT: sem data-cy
                        cy.contains(/Erro/i).should('be.visible')
                    })
                })

                it('deve bloquear upload de arquivo que excede o tamanho máximo', () => {
                    cy.get('@fixture').then(({ dadosInvalidos }: any) => {
                        cy.contains('[role="option"]', dadosInvalidos.documentosPessoais.categoria).first().click({ force: true })
                        cy.get('input[type="file"]').attachFile(dadosInvalidos.documentosPessoais.arquivo_tamanho_excedido) // REPORT: sem data-cy
                        cy.contains(/Erro/i).should('be.visible')
                    })
                })
            })

            context('Excluir', () => {
                it('deve remover documento pessoal com sucesso', () => {
                    cy.get('@fixture').then(({ dadosValidos }: any) => {
                        cy.get('[data-cy="select-categories-usuario-anexo"]').click()
                        cy.contains('[role="option"]', dadosValidos.documentosPessoais.categoria).first().click({ force: true })
                        cy.get('input[type="file"]').attachFile(dadosValidos.documentosPessoais.arquivo)
                        cy.get('[data-icon="trash"]').first().click()
                        cy.contains(/Sucesso/i).should('be.visible')
                        })
                })
            })
        })
    })
})

/*
  REPORT — ELEMENTOS SEM data-cy IDENTIFICADOS
  completar-cadastro.cy.ts:
  - Input de upload — Documentos Pessoais do Perfil
*/