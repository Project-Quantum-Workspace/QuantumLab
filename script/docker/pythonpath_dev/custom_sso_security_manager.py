import logging
from superset.security import SupersetSecurityManager


class CustomSsoSecurityManager(SupersetSecurityManager):

    def oauth_user_info(self, provider, response=None):
        logging.debug("Oauth2 provider: {0}.".format(provider))
        if provider == 'QuantumLab':
            me = self.appbuilder.sm.oauth_remotes[provider].get("userDetails").json()
            logging.debug("user_data: {0}".format(me))
            return {
                "id": me["id"],
                "username": me["email"],
                "email": me["email"],
                "first_name": me["firstName"],
                "last_name": me["lastName"],
                "roles": CustomSsoSecurityManager._get_role_list(me["roles"])
            }

    @staticmethod
    def _get_role_list(roles):
        role_list = []
        for role in roles:
            role_list.append(role["name"])
        return role_list
