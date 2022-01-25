import click
from .docker import docker


@click.command()
@click.argument('env')
@click.argument('option', required=False)
@click.argument('action', required=False)
def main(env, option, action):
    if env == "docker":
        docker(option)