// dataservice factory

var myAppServices = angular.module('helloWorldApp.myAppServices', ['ngResource']);

myAppServices.factory('Reference', function($http) {
    var dossiers = {
        getDossiers: function() {
            return $http.get('./rest/desherence/init').then(function(response) {
                return response.data;
            });
        }
    };
    return dossiers;
});

myAppServices.factory('UserSession', function($http) {
    var userSession = {
        getUser: function() {
            return $http.get('./rest/desherence/getUserSession').then(function(response) {
                return response.data;
            });
        }
    };
    return userSession;
});


myAppServices.factory('RechercheDossierAGIRA2', function($http) {
    var dossiers = {
    		rechercheDossiers: function(searchBean) {
            return $http.post('./rest/desherence/rechercheDossiers',searchBean).then(function(response) {
                return response.data;
            });
        }
    };
    return dossiers;
});

myAppServices.factory('ExportAGIRA', function($http) {
    var dossiers = {
    		ExportDossiers: function(listBean) {
            return $http.post('./rest/desherence/exportAGIRA',listBean).then(function(response) {
                return response.data;
            });
        }
    };
    return dossiers;
});

myAppServices.factory('ListeDossiersEnCours', function($http) {
    var dossiersEnCours = {
        getDossiersEnCours: function() {
            return $http.get('./rest/desherence/getListeDossiersEnCours').then(function(response) {
                return response.data;
            });
        }
    };
    return dossiersEnCours;
});

myAppServices.factory('RechercheDossier', function($http) {
    var dossiers = {
    		getRechercheDossier: function(searchBean) {
            return $http.post('./rest/desherence/getRechercheDossier',searchBean).then(function(response) {
                return response.data;
            });
        }
    };
    return dossiers;
});

myAppServices.factory('RechercheDossierEnCours', function($http) {
    var dossiers = {
    		getRechercheDossierEnCours: function(searchBean) {
            return $http.post('./rest/desherence/getRechercheDossierEnCours',searchBean).then(function(response) {
                return response.data;
            });
        }
    };
    return dossiers;
});

myAppServices.factory('Export', function($http) {
    var dossiers = {
    		ExportDossiers: function(listBean) {
            return $http.post('./rest/desherence/export',listBean).then(function(response) {
                return response.data;
            });
        }
    };
    return dossiers;
});

myAppServices.factory('Contrats', function($timeout, $http) {
    var contrats = {
        fetch: function() {
            return $timeout(function() {
                return $http.post('./rest/getlistecontrats').then(function(response) {
                    return response.data;
                });
            }, 30);
        }
    };
    return contrats;
});


// service Detail du dossier
myAppServices.factory('Details', function($http) {
    var details = {
        getDetails: function(dossier) {
            return $http.post('./rest/getdetailsdossier', dossier).then(function(response) {
                return response.data;
            });
        }
    };
    return details;
});

//service Detail du dossier Agenda
myAppServices.factory('Agenda', function($http) {
    var dossierAgenda = {
    	getDossierAgenda: function() {
            return $http.get('./rest/getdossieragenda').then(function(response) {
                return response.data;
            });
        }
    };
    return dossierAgenda;
});

myAppServices.factory('DoublonsAgenda', function($timeout, $http) {
    var doublons = {
        getDoublonsAgenda: function() {
            return $http.post('./rest/getdoublonsagenda').then(function(response) {
                return response.data;
            });
        }
    };
    return doublons;
});




myAppServices.factory('ServiceDossierCourant', serviceDossierCourant);

function serviceDossierCourant($http, $log){
	return {
		getDossierCourant: getDossierCourant
	};

	function getDossierCourant() {
		 return $http.get('./rest/dossier/courant')
		 	.success(getDossierCourantComplete)
		 	.error(getDossierCourantFailed);

		 function getDossierCourantComplete(response){
			 return response;
		 }

		 function getDossierCourantFailed(error) {
				$log.error('XHR Failed for getDossierCourant.');
			}
	}
}

// Service Recherche Homonymie
myAppServices.factory('Homonymes', homonymesservice);

function homonymesservice($http, $log) {
	return {
		getHomonymes: getHomonymes,
		update:update,
		getDetailsDossierApprochant:getDetailsDossierApprochant,
		creationDossier:creationDossier,
		getListeRapprochament:getListeRapprochament,
		majRapprochement:majRapprochement
	};

	function getHomonymes() {
		return $http.get('./rest/getHomonymes')
			.success(getHomonymesComplete)
			.error(getHomonymesFailed);

		function getHomonymesComplete(response) {
			return response.list;
		}

		function getHomonymesFailed(error) {
			$log.error('XHR Failed for getHomonymes.');
		}
	}

	//MAJ du dossier
	function update(dossier){
		return $http({url : './rest/update',  method:'POST', data: dossier})
				.success(majComplete)
				.error(saveFailed);

		function majComplete(result){
			return result.data;
		}

		function saveFailed(){
			$log.error('XHR Failed for update.');
		}
	}
	function creationDossier(dossier){
		return $http({url : './rest/creationDossier',  method:'POST', data: dossier})
				.success(creationComplete)
				.error(saveFailed);

		function creationComplete(result){
			return result.data;
		}

		function saveFailed(){
			$log.error('XHR Failed for création.');
		}
	}

	//get dossier approchant choisit
	function getDetailsDossierApprochant(numeroDossierAppochant){
		return $http({url : './rest/getDetailsDossierApprochant',  method:'POST', data: numeroDossierAppochant})
				.success(getDossier)
				.error(saveFailed);

		function getDossier(result){
			return result.data;
		}

		function saveFailed(){
			$log.error('XHR Failed for get dossier approchant.');
		}
	}

	// récuperer la liste de rapprochament
	function getListeRapprochament() {
		return $http.get('./rest/getListeRapprochament')
			.success(getRapprochamentComplete)
			.error(getRapprochamentFailed);

		function getRapprochamentComplete(response) {
			return response.list;
		}

		function getRapprochamentFailed(error) {
			$log.error('XHR Failed for ListeRapprochament.');
		}
	}
	// mettre à jour les 2 dossier rapprochement
	function majRapprochement(numeroDossierCible){
		return $http({url : './rest/majRapprochement',  method:'POST', data: numeroDossierCible})
				.success(update)
				.error(updateFailed);

		function update(result){
			return result.data;
		}

		function updateFailed(){
			$log.error('XHR Failed for maj Rapprochement');
		}
	}


}

myAppServices.factory('Doublons', function($timeout, $http) {
    var doublons = {
        getDoublons: function() {
            return $http.post('./rest/getdoublons').then(function(response) {
                return response.data;
            });
        }
    };
    return doublons;
});

myAppServices.factory('Login', function($timeout, $http) {

});

myAppServices.factory('Syntheseservice', syntheseservice);

function syntheseservice($http, $log){
	return {
		initialize: initialize,
		save: save,
		getTypeBeneficiaires : getTypeBeneficiaires,
		getEtatContrat: getEtatContrat,
		getEtatBeneficiaire: getEtatBeneficiaire,
		getEtatsDossier: getEtatsDossier,
		getPseudoSA: getPseudoSA,
		synchronize: synchronize
	};

	function initialize(){
		return $http.get('./rest/desherence/synthese/init')
				.success(initializeComplete)
				.error(initializeFailed);

		function initializeComplete(result){
			return result;
		}

		function initializeFailed(){
			$log.error('XHR Failed for initialize.');
		}
	}

	function save(dossier){
		return $http({url : './rest/desherence/synthese/save',  method:'POST', data: dossier})
				.success(saveComplete)
				.error(saveFailed);

		function saveComplete(result){
			return result.data;
		}

		function saveFailed(){
			$log.error('XHR Failed for save.');
		}
	}

	function getTypeBeneficiaires(){
		return $http.get('./rest/desherence/synthese/getTypeBeneficiaires')
				.success(getTypeBeneficiairesComplete)
				.error(getTypeBeneficiairesFailed);

		function getTypeBeneficiairesComplete(result) {
			return result.data;
		}

		function getTypeBeneficiairesFailed(){
			$log.error('XHR Failed for getTypeBeneficiaires.');
		}
	}

	function getEtatContrat(){
		return $http.get('./rest/desherence/synthese/getEtatContrat')
				.success(getEtatContratComplete)
				.error(getEtatContratFailed);

		function getEtatContratComplete(result) {
			return result.data;
		}

		function getEtatContratFailed(){
			$log.error('XHR Failed for getEtatContrat.');
		}
	}

	function getEtatBeneficiaire(){
		return $http.get('./rest/desherence/synthese/getEtatBeneficiaire')
				.success(getEtatBeneficiaireComplete)
				.error(getEtatBeneficiaireFailed);

		function getEtatBeneficiaireComplete(result) {
			return result.data;
		}

		function getEtatBeneficiaireFailed(){
			$log.error('XHR Failed for getEtatBeneficiaires.');
		}
	}

	function getEtatsDossier(){
		return $http.get('./rest/desherence/synthese/getEtatsDossier')
				.success(getEtatsDossierComplete)
				.error(getEtatsDossierFailed);

		function getEtatsDossierComplete(result) {
			return result.data;
		}

		function getEtatsDossierFailed(){
			$log.error('XHR Failed for getEtatContrat.');
		}
	}

	function getPseudoSA(){
		return $http.get('./rest/desherence/synthese/getPseudoSA')
		.success(getPseudoSAComplete)
		.error(getPseudoSAFailed);

		function getPseudoSAComplete(result) {
			return result.data;
		}

		function getPseudoSAFailed(){
			$log.error('XHR Failed for getEtatContrat.');
		}
	}

	function synchronize(client){
		return $http({url : './rest/desherence/synthese/synchronize',  method:'POST', data: client})
			.success(synchronizeComplete)
			.error(synchronizeFailed);
	}

	function synchronizeComplete(result){
			return result.data;
	}

	function synchronizeFailed(){
		$log.error('XHR Failed for synchronize.');
	}

}



